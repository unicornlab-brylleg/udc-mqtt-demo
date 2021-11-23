import React from 'react'
import { Flex, Heading, VStack, StackDivider } from '@chakra-ui/layout'
import { MqttClientContext } from '../../Contexts/mqttClientContext'
export default function Enduser() {
    const { client } = React.useContext(MqttClientContext)
    const [messages, setMessages] = React.useState<string[]>([])
    React.useEffect(function onFirstMount() {
        client.subscribe('UDC-013')
        client.on('message', (topic: string, message: string) => {
            setMessages(messages => [...messages, message.toString()])
        })
    }, [client])
    return (
        <Flex width="100%" flexDirection="column" mt="3rem" justifyContent="center" alignItems="center">
            <Heading as="h1">Welcome EndUser,</Heading>
            <p>connection status: {client ? "connected" : "not connected"} to session: UDC-013</p>
            <Heading as="h5" size="sm" mt="2rem">Session Logs</Heading>
            <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                align="stretch"
                mt="1rem"
            >
                {messages.map((message, index) => {
                    return <p key={index}>{message}</p>
                })}
            </VStack>
        </Flex>
    )
}
