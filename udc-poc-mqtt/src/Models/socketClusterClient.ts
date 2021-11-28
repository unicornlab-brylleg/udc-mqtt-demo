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
  userName: string;
  authToken: string;

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
    this.userName = uuid();
    this.authToken = uuid();
  }
  async handleDirectAdminActions(announcer: Function) {
    this.socket.subscribe(this.userName);
    if (this.socket.channel(this.userName).isSubscribed()) {
      for await (let data of this.socket.channel(this.userName)) {
        console.log(data);
        announcer();
      }
    }
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
      console.log(event);
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
  async handleChatMessage(topic: string, prev: String[], setter: Function) {
    if (!this.socket.channel(topic).isSubscribed()) {
      this.sub(topic);
      let channel = this.socket.channel(topic);
      for await (let message of channel) {
        console.log(message);
        let jason = JSON.parse(message.raw_data);
        if (jason.type === "chat") {
          console.log("chat message");
          console.log(jason);
          let old = prev;
          old.push(jason.message);
          setter(old);
        } else {
          console.log("not chat");
        }
      }
    } else {
      let channel = this.socket.channel(topic);
      for await (let message of channel) {
        console.log(message);
        let jason = JSON.parse(message.raw_data);
        if (jason.type === "chat") {
          console.log("chat message");
          console.log(jason);
          let old = prev;
          old.push(jason.message);
          setter(old);
        } else {
          console.log("not chat");
        }
      }
    }
  }
  async sub(topic: string) {
    let payload = {
      user: this.userName,
      type: "ping",
    };
    this.socket.subscribe(topic);
    this.socket.transmitPublish(topic, JSON.stringify(payload));
  }
  async channelJoinListener(topic: string, appender: Function) {
    let channel = this.socket.channel(topic);
    if (!channel.isSubscribed()) {
      this.sub(topic);
    }
    for await (let message of channel) {
      let jason = JSON.parse(message.raw_data);
      if (jason.type === "ping") {
        appender(jason.user);
      } else {
        console.log("not chat");
      }
    }
  }

  async submitChatMessage(topic: string, message: string) {
    let payload = {
      user: this.userName,
      type: "chat",
      message: message,
    };
    this.socket.transmitPublish(topic, JSON.stringify(payload));
  }
}
