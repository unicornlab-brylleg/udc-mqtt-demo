import socketClusterClient from "socketcluster-client";
export const socketClusterConnectionHandler = async (
  setter: any,
  clients: any
) => {
  try {
    // socketClusterClient
    // let socket = socketClusterClient.create({
    //   hostname: "localhost",
    //   port: 9002,
    // });
    // socket.transmit("customProc", 123);
    // let statusInitial = await socket.listener("connect").once();
    // console.log(`auth status initial`, statusInitial);
    // // login
    // let credentials = {
    //   username: "alice123",
    //   password: "thisisapassword654",
    // };
    // setter({ ...clients, socketCluster: socket });
    //     try {
    //       // Invoke a custom 'login' procedure (RPC) on our server socket
    //       // then wait for the socket to be authenticated.
    //       await socket.invoke("login", credentials);
    //       await socket.listener("authenticate").once();
    //       let statusFinal = await socket.listener("connect").once();
    //       console.log(`auth status final`, statusFinal);
    //       socket.transmit("customProc", "im connected");
    //     } catch (error) {
    //       console.log("Error logging in client to ws server!", error);
    //       socket.transmit("customProc", "im connected");
    //       return;
    //     }
    //   } catch {
    //     console.log("Error setting up websocket client!");
    //   }
  } catch (err) {
    console.log("Error setting up websocket client!");
    console.log(err);
  }
};
