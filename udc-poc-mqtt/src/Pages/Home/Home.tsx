import React from 'react'
import { Box, Flex, Heading } from '@chakra-ui/layout'
import '../../global.css'
import { useNavigate } from 'react-router-dom'
export default function Home() {
    const navigate = useNavigate()
    function goToAdmin() {
        console.log('goToAdmin')
        navigate('/admin')
    }
    function goToEndUser() {
        console.log('goToEndUser')
        navigate('/enduser')
    }
    return (
        <Flex flexDirection="column" justifyContent="center" alignItems="center">
            <Flex direction="column">
                <Heading as="h1" mt="2rem">
                    Pick user type
                </Heading>
            </Flex>
            <div style={{ display: "flex", flexDirection: "row", gap: "4rem", marginTop: "4rem" }} >
                <Box className="hoverable" width="16rem" height="16rem" boxShadow="dark-lg" borderRadius="1rem" display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="2rem" onClick={goToAdmin} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" fill="currentColor" className="bi bi-bullseye" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10zm0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                        <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                        <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    </svg>
                    <p>
                        Admin
                    </p>
                </Box>
                <Box className="hoverable" width="16rem" height="16rem" boxShadow="dark-lg" borderRadius="1rem" display="flex" flexDirection="column" justifyContent="center" alignItems="center" onClick={goToEndUser}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    </svg>
                    <p>
                        End user
                    </p>
                </Box>
            </div>
        </Flex>
    )
}
