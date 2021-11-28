import React from 'react'
import { Flex, Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { useNavigate } from 'react-router'
export default function Ended() {
    const nav = useNavigate()
    function goToSessionGallery() {
        nav('/sessions')
    }
    return (
        <Flex flexDirection="column" minHeight="80vh" width="100%" justifyContent="Space-Evenly" alignItems="center">
            <Text fontSize="4xl" color="black.500" >
                Session Has Ended
            </Text>
            <Button colorScheme="blue" onClick={goToSessionGallery}>
                View Other Sessions
            </Button>

        </Flex>)
}
