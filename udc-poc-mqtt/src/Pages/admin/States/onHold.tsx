import React from 'react'
import { Button } from '@chakra-ui/button'
import { Flex, Heading, Text } from '@chakra-ui/layout'
interface onHoldViewProps {
    resumeCurrentSession: Function
}

export default function OnHold({ resumeCurrentSession }: onHoldViewProps) {
    return (
        <Flex flexDirection="column" minHeight="80vh" width="100%" justifyContent="Space-Evenly" alignItems="center">
            <Text fontSize="4xl" color="black.500" >
                Session is Curently on Hold
            </Text>
            <Button colorScheme="green" onClick={() => resumeCurrentSession()}>
                Resume Session
            </Button>

        </Flex>)
}
