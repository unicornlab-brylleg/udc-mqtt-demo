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
        socketClient.socket.transmitPublish(user, 'mute');
    }
    return (
        <Flex flexDirection="row">
            <Text>{user}</Text>
            <span onClick={muteUser}>M</span>
            <span>k</span>
        </Flex>

    )
}
