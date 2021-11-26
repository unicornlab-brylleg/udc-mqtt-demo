import { Flex, Heading, Text } from '@chakra-ui/layout'
import React from 'react'
import SessionDrawer from '../SessionDrawer/SessionDrawer'

interface TopBarPropTypes {
    sessionName: string
}

export default function TopBar(props: TopBarPropTypes) {
    return (
        <Flex bg="blue.600" height="3rem" width="100%" boxShadow="md" p="1rem" flexDirection="row" justifyContent="space-between" alignItems="center">
            <Text fontSize="md" color="blue.100">UDC</Text>
            <Heading as="h1" size="md" color="blue.100">{props.sessionName}</Heading>
            <SessionDrawer />

        </Flex>
    )
}
