import { useContext } from "react";
import { socketClientsContext } from "./../../Contexts/SocketClientsContext";
import { SCClient } from "../../Models/socketClusterClient";

export async function useCreateSocketClient(email: string, password: string) {
  //   let clientInstance = new SCClient(
  //     process.env.REACT_APP_SOCKET_HOST,
  //     process.env.REACT_APP_SOCKET_PORT,
  //     email
  //   );
  //   const { setSocketClient } = useContext(socketClientsContext);
  //   console.log("useCreateSocketClient", clientInstance);
}
