import React from 'react'
import { Flex, Heading, VStack, StackDivider } from '@chakra-ui/layout'
import { MqttClientContext } from '../../Contexts/mqttClientContext'
import { socketClientsContext } from '../../Contexts/SocketClientsContext'
import { AGClientSocket } from 'socketcluster-client'
import { SCClient } from '../../Models/socketClusterClient'
export default function Enduser() {
    const { client } = React.useContext(MqttClientContext)
    const { socketClients } = React.useContext(socketClientsContext)
    const [messages, setMessages] = React.useState<string[]>([])
    const [newSocketClient, setnewSocketClient] = React.useState<SCClient>()
    React.useEffect(function onFirstMount() {
        //sub()
        //console.log(socketClients)
        let socketClient = socketClients.AGClientSocket as AGClientSocket;
        let clientnew = new SCClient('localhost', 9002, 'testClient');
        setnewSocketClient(clientnew)
        client?.subscribe('UDC-013')
        client?.on('message', (topic: string, message: string) => {
            setMessages(messages => [...messages, message.toString()])
        })
    }, [client])

    async function sub() {
        // let socketClient = socketClients.socketCluster as AGClientSocket;
        // if (socketClient) {
        //     console.log('subscribing to UDC-013')
        //     let channel = socketClient?.subscribe('foo');

        //     for await (let data of channel) {
        //         console.log(data);
        //     }
        // }
        newSocketClient?.subscriptionListener('dog').then();
    }

    function test() {
        sub()
        // let socketClient = socketClients.socketCluster as AGClientSocket;
        // // console.log(socketClient)
        // socketClient?.transmitPublish('foo', 'bar');
        // socketClient?.send('foo');
        // socketClient?.invoke('boradcast', 'bar');
        newSocketClient?.socket.transmitPublish('dog', 'bar');
    }

    return (
        <Flex width="100%" flexDirection="column" mt="3rem" justifyContent="center" alignItems="center" onClick={test}>
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
