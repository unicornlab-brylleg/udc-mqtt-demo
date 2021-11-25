import React, { useContext } from "react";
import { AuthCtx } from "../../Contexts/authContext";
import { UserTypes } from "../../Models/userTypes";

export default function useLogin() {
    const [authed, setAuthed] = React.useState<any>(false);
    const { setUser } = useContext(AuthCtx);
    const handleLogin = (email: string, password: string) => {
        let ret = null
        if (email === "k@gmail.com" && (password === "k" || password === "p")) {
            ret = {
                email: email,
                type: password === "k" ? UserTypes.ADMIN : UserTypes.USER,
            }
            console.log(ret)
            setUser(ret);
            localStorage.setItem("user", JSON.stringify(ret));
            setAuthed(true);
            return ret
        } else {
            setAuthed(false);
            return ret
        }
    };
    return [authed, handleLogin];
}