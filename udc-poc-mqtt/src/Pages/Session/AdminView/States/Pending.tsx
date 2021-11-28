import { Button } from '@chakra-ui/button'
import { Flex, Text } from '@chakra-ui/layout'
import React from 'react'

interface pendingViewProps {
    startCurrentSession: Function
    cancelCurrentSession: Function
}
export default function Pending({ startCurrentSession, cancelCurrentSession }: pendingViewProps) {
    return (
        <Flex flexDirection="column" minHeight="80vh" width="100%" justifyContent="Space-Evenly" alignItems="center">
            <Text fontSize="4xl" color="black.500" >
                Session Has Not Started Yet
            </Text>
            <Flex flexDirection="row" justifyContent="center" style={{ gap: "2rem" }}>
                <Button colorScheme="blue" onClick={() => { startCurrentSession() }}>
                    Start Session
                </Button>
                <Button colorScheme="red" onClick={() => { cancelCurrentSession() }}>
                    Cancel Session
                </Button>
            </Flex>
        </Flex>
    )
}
