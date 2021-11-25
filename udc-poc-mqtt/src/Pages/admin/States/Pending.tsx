import { Button } from '@chakra-ui/button'
import { Flex, Heading, Text } from '@chakra-ui/layout'
import React from 'react'

interface pendingViewProps {
    startCurrentSession: Function
}
export default function Pending({ startCurrentSession }: pendingViewProps) {
    return (
        <Flex flexDirection="column" minHeight="80vh" width="100%" justifyContent="Space-Evenly" alignItems="center">
            <Text fontSize="4xl" color="black.500" >
                Session Has Not Started Yet
            </Text>
            <Button colorScheme="blue" onClick={() => { startCurrentSession() }}>
                Start Session
            </Button>
        </Flex>
    )
}
