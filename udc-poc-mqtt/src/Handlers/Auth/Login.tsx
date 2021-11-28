import { useContext, useState, useEffect } from "react";
import { AuthCtx } from "../../Contexts/authContext";
import { useCreateSocketClient } from "../SocketHandlers/SocketHandler";
export default function UseLogin(email: string, password: string) {
  // const [authed, setAuthed] = useState(false);
  // /*
  //  *   Obvisouly, the login function will be more complicated but this is just for the sake of the poc
  //  *   and tbh i cba to make it more complex
  //  */
  // function handleLogin() {
  //   let returnee = null;
  //   if (email === "k@gmail.com" && password === "k") {
  //     returnee = {
  //       email: email,
  //       password: password,
  //     };
  //     const { setUser } = useContext(AuthCtx);
  //     setUser(returnee);
  //     useCreateSocketClient(email, password);
  //     setAuthed(true);
  //   }
  // }
  // return authed;
}
