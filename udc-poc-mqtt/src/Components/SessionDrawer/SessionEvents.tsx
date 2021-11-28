import { Flex, VStack, StackDivider, Text } from '@chakra-ui/layout';
import React from 'react'

interface sessionEventsProps {
    logs: string[]
}

export default function SessionEvents({ logs }: sessionEventsProps) {

    return (
        <Flex flexDirection="column" justifyContent="center" alignItems="center">
            <Text fontSize="sm">Session Logs</Text>
            <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                align="stretch"
                mt="1rem"
            >
                {logs && logs.map((message, index) => {
                    return <p key={index}>{message}</p>
                })}
            </VStack>
        </Flex>
    )
}
