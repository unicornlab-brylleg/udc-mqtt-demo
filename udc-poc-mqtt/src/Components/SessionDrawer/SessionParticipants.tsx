import React from 'react'
import { Flex, Text, VStack, StackDivider } from '@chakra-ui/layout'
import SessionParticipant from '../SessionParticipant/SessionParticipant'

interface SessionParticipantsProps {
    participantsList: string[]
}

export default function SessionParticipants({ participantsList }: SessionParticipantsProps) {
    return (
        <Flex flexDirection="column" justifyContent="center" alignItems="center">
            <Text fontSize="sm">Session participants</Text>
            <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                align="stretch"
                mt="1rem"
            >
                {participantsList && participantsList.map((user, index) => {
                    return <SessionParticipant key={index} user={user} />
                })}
            </VStack>
        </Flex>
    )
}
