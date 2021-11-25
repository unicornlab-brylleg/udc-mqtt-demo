import React from 'react'
import { Box, Flex, Heading } from '@chakra-ui/layout'
import '../../global.css'
interface SessionCardsProps {
    sessionName: string
    sessionId: string
}

export const SessionCards: React.FC<SessionCardsProps> = (props: SessionCardsProps) => {
    return (
        <Box className="hoverable" borderRadius="2xl" boxShadow="lg" bg="blue.50" height="12rem" width="12rem">
            <Flex flexDirection="column" height="100%" width="100%" space="space-evenly" justifyContent="center" alignItems="center" p="2rem">
                <Heading as="h3" fontSize="sm" fontWeight="semibold" color="blue.500" textAlign="center">
                    {props.sessionName}
                </Heading>
            </Flex>
        </Box>
    )
}
