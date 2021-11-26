import { Flex, VStack, StackDivider, Text } from '@chakra-ui/layout';
import React from 'react'
import { MqttClientContext } from '../../Contexts/mqttClientContext';

export default function SessionEvents() {
    const [sessionLogs, setSessionLogs] = React.useState<string[]>([]);
    const { client } = React.useContext(MqttClientContext);
    React.useEffect(() => {
        if (client) {
            client?.subscribe('UDC-013');
            client?.on('message', (_: string, message: string) => {
                if (_ === 'UDC-013') {
                    let parsedMessage = JSON.parse(message);
                    setSessionLogs([...sessionLogs, parsedMessage.message]);
                }
            });
        }
    }, [sessionLogs]);
    return (
        <Flex flexDirection="column" justifyContent="center" alignItems="center">
            <Text fontSize="sm">Session Logs</Text>
            <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                align="stretch"
                mt="1rem"
            >
                {sessionLogs.map((message, index) => {
                    return <p key={index}>{message}</p>
                })}
            </VStack>


        </Flex>
    )
}
