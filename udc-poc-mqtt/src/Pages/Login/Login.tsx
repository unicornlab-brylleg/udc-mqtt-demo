import React, { useContext } from 'react'
import { Box, Flex, Heading } from '@chakra-ui/layout'
import {
    FormControl,
    FormLabel,
    useToast,
    Input, Button
} from "@chakra-ui/react"
import useDemo from '../../Hooks/Demo/Demo'
import useLogin from '../../Hooks/Auth/LoginHook'
import useSocketClient from '../../Hooks/SocketClient/useSocketClient'
import { useNavigate } from 'react-router'
import '../../global.css'
import { socketClientsContext } from '../../Contexts/SocketClientsContext'


export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")
    const [isCopied, handleCopy] = useDemo()
    const [user, handleLogin] = useLogin()
    const [connectionEstablished, handleCreateSocketClient] = useSocketClient()
    const { setSocketClient } = useContext(socketClientsContext)
    const toast = useToast()


    function handleUserLogin(e: any) {
        e.preventDefault()
        console.log(email, password)
        const loginResponse = handleLogin(email, password)
        const socketResponse = handleCreateSocketClient(email, password)
        setSocketClient(socketResponse)
        if (loginResponse && socketResponse) {
            navigate("/Sessions")
        } else {
            if (!loginResponse) {
                toast({
                    position: "bottom-left",
                    render: () => (
                        <Box color="white" p={3} bg="blue.500" borderRadius="md">
                            Login Error
                        </Box>
                    ),
                })
            }
        }
    }
    return (
        <div className="triangularBackdrop">
            <Box bg="white" borderRadius="2xl" boxShadow="dark-lg" p="2rem 4rem">
                <Heading as="h1" size="lg" mb="1rem" >
                    Login
                </Heading>
                <form onSubmit={handleUserLogin}>
                    <FormControl id="email" isRequired={true}>
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" onChange={(e) => { setEmail(e.target.value) }} />
                    </FormControl>
                    <FormControl id="password" isRequired={true}>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" onChange={(e) => { setPassword(e.target.value) }} />
                    </FormControl>
                    <Flex mt="2rem" flexDirection="row" justifyContent="flex-end">
                        <Button colorScheme="blue" type="submit">Login</Button>
                    </Flex>
                </form>
            </Box>
        </div>)


}
