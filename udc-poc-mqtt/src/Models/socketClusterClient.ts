import * as sc_client from "socketcluster-client";
import { v4 as uuid } from "uuid";
// const sc_client = require("socketcluster-client");

/**
 * class to handle creation & basic listeners for a connection to a socket cluster server
 * @type {SCClient}
 */
export class SCClient {
  socket;
  client_name;
  constructor(
    host: any = "localhost",
    port: any = "9002",
    client_name: any = uuid()
  ) {
    console.log("creating socket");
    console.log(host);
    this.socket = sc_client.create({
      hostname: process.env.REACT_APP_SOCKET_HOST,
      port: parseInt(process.env.REACT_APP_SOCKET_HOST_PORT ?? "9002"),
    });
    this.client_name = client_name;
    this.createListeners();
  }

  createListeners() {
    this.errorListener().then();
    this.connectListener().then();
    this.getChannelDataProcedureListener().then();
  }

  /**
   * logs any errors that occur for the socket
   * @returns {Promise<void>}
   */
  async errorListener() {
    for await (let { error } of this.socket.listener("error")) {
      console.error(error);
    }
  }

  /**
   * handles to connect event with a SC server and invokes the server's login function to authenticate
   * @returns {Promise<void>}
   */
  async connectListener() {
    for await (let event of this.socket.listener("connect")) {
      console.log("Socket is connected");
      try {
        await Promise.all([
          this.socket.invoke("login", {
            username: "kyle",
            password: "thebestpassword",
            client_name: this.client_name,
          }),
          this.socket.listener("authenticate").once(),
        ]);
        console.log("Socket is auth!");
      } catch (error: any) {
        console.error(error.message);
      }
    }
  }

  async getChannelDataProcedureListener() {
    for await (let request of this.socket.procedure("getChannelData")) {
      request.end({});
      continue;
    }
  }

  async adminMqttTransmitter(room: string, data: Object) {
    this.socket.transmit("ADMIN_ACTION", {
      payload: data,
      room: room,
      adminAction: true,
    });
  }

  /**
   * creates a listener on an sc server's channel
   * @param channel
   * @param logic_function
   * @returns {Promise<void>}
   */
  async subscriptionListener(channel: any, logic_function = undefined) {
    try {
      for await (let data of this.socket.subscribe(channel)) {
        if (logic_function === undefined) {
          console.log(data);
        } else {
          console.log("idk");
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
}
