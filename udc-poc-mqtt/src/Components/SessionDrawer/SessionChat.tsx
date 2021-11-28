import React from 'react'
import { Flex, Text, VStack, StackDivider } from '@chakra-ui/layout'
import { Button, Textarea } from "@chakra-ui/react"

interface sessionChatProps {
    SessionMessages: string[],
    setSessionMessages: Function
}

export default function SessionChat({ SessionMessages, setSessionMessages }: sessionChatProps) {
    const [message, setMessage] = React.useState("")
    const submitMessage = () => {
        if (message.length > 0) {
            setSessionMessages([...SessionMessages, message])
            setMessage("")
        }
    }
    return (
        <Flex flexDirection="column" justifyContent="center" alignItems="center" height="100%">
            <Text fontSize="sm">SessionChat</Text>
            <Flex flexDirection="column" height="100%" width="100%" justifyContent="space-between" >
                <VStack
                    divider={<StackDivider borderColor="gray.600" />}
                    spacing={4}
                    align="stretch"
                    mt="1rem"
                    overflowY="scroll"
                >
                    {
                        SessionMessages.map((message, index) => {
                            return <Text key={index}>{message}</Text>
                        })
                    }

                </VStack>
                <Flex flex="row" alignItems="center" justifyContent="center" style={{ gap: "1rem" }}>
                    <Textarea value={message} onChange={(e) => {
                        setMessage(e.target.value)
                    }} placeholder="Type your message here" color="white" />
                    <Button colorScheme="blue" onClick={submitMessage} >Send</Button>
                </Flex>
            </Flex>
        </Flex>
    )
}
