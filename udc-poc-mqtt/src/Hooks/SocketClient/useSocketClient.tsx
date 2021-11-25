import React, { useContext, useState } from "react"
import { socketClientsContext } from "../../Contexts/SocketClientsContext"
import { SCClient } from "../../Models/socketClusterClient"
const useSocketClient = () => {
    const [connectionEstablished, setConnectionEstablished] = useState<any>(false)
    const { setSocketClient } = useContext(socketClientsContext)
    const handleCreateSocketClient = React.useCallback((email: string, pass: string) => {

        const socketClient = new SCClient(process.env.REACT_APP_SOCKET_HOST, parseInt(process.env.REACT_APP_SOCKET_PORT ?? "9002"), email)
        console.log("socketClient", socketClient)
        setSocketClient(socketClient)
        setConnectionEstablished(true)
        return true
    }, [])
    return [connectionEstablished, handleCreateSocketClient]
}

export default useSocketClient