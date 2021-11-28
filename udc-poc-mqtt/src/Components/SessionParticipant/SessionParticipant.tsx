import { Flex, Text } from '@chakra-ui/layout'
import React from 'react'
import { SessionContext } from '../../Contexts/SessionContext'
import { SCClient } from '../../Models/socketClusterClient'



interface SessionParticipantPropTypes {
    user: string
}
export default function SessionParticipant({ user }: SessionParticipantPropTypes) {
    const { sessionHandlers } = React.useContext(SessionContext)
    const socketClient = sessionHandlers.socketClient as SCClient
    const muteUser = () => {
        console.log(`muting user ${user}`)
        socketClient.socket.subscribe(user)
        socketClient.socket.transmitPublish(user, 'mute');
        socketClient.socket.unsubscribe(user)
    }
    return (
        <Flex flexDirection="row">
            <Text>{user}</Text>
            {socketClient.userName !== user ? <span onClick={muteUser}>M</span> : null}
        </Flex>

    )
}
