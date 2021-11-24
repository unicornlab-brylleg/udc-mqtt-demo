import * as http from "http";
import * as socketCluster from "socketcluster-server";

let httpServer = http.createServer();
let scServer = socketCluster.attach(httpServer);
(async () => {
  // Handle new inbound sockets.
  for await (let { socket } of scServer.listener("connection")) {
    //
    (async () => {
      // Set up a loop to handle and respond to RPCs for a procedure.
      for await (let req of socket.procedure("customProc")) {
        if (req.data.bad) {
          let error = new Error("Server failed to execute the procedure");
          error.name = "BadCustomError";
          req.error(error);
        } else {
          req.end("Success");
        }
      }
    })();

    (async () => {
      // Set up a loop to handle remote transmitted events.
      for await (let data of socket.receiver("customProc")) {
        console.log("received data", data);
      }
    })();

    (async () => {
      // Set up a loop to handle remote transmitted events.
      for await (let data of socket.receiver("Broadcast")) {
        console.log("received data", data);
      }
    })();

    for await (let request of socket.procedure("broadcast")) {
      console.log("received data", request.data);
    }

    for await (let request of socket.procedure("login")) {
      const credentials = request.data;
      console.log(`credentials`, credentials);
      const { username, password } = credentials;

      let isValidLogin =
        username === "alice123" && password === "thisisapassword654";
      console.log(`isValidLogin`, isValidLogin);
      if (!isValidLogin) {
        let loginError = new Error("Invalid user credentials");
        loginError.name = "LoginError";
        request.error(loginError);
        return;
      }

      // End the 'login' request successfully.
      request.end();

      // This will give the client a token so that they won't
      // have to login again if they lose their connection
      // or revisit the app at a later time.
      socket.setAuthToken({
        username: username,
        channels: "channel",
      });
    }
  }

  // JWT verification
  //   agServer.setMiddleware(
  //     agServer.MIDDLEWARE_INBOUND,
  //     async (middlewareStream) => {
  //       for await (let action of middlewareStream) {
  //         if (action.type === action.PUBLISH_IN) {
  //           let authToken = action.socket.authToken;
  //           if (
  //             !authToken ||
  //             !Array.isArray(authToken.channels) ||
  //             authToken.channels.indexOf(action.channel) === -1
  //           ) {
  //             let publishError = new Error(
  //               `You are not authorized to publish to the ${action.channel} channel`
  //             );
  //             publishError.name = "PublishError";
  //             action.block(publishError);

  //             continue; // Go to the start of the loop to process the next inbound action.
  //           }
  //         }

  //         // Any unhandled case will be allowed by default.
  //         action.allow();
  //       }
  //     }
  //   );
})();

httpServer.listen(8000);

console.log("socketcluster WS server listening to port 8000 ...");
