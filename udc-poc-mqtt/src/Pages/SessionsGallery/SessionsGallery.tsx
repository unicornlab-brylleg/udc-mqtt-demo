import React from 'react'
import { Center, Flex, Heading, SimpleGrid } from '@chakra-ui/layout'
import { SessionCards } from '../../Components/SessionCards/SessionCards'
import '../../global.css'
import { createBreakpoints } from "@chakra-ui/theme-tools"
import { useNavigate } from 'react-router'

// This is the default breakpoint
export default function SessionsGallery() {
    const nav = useNavigate()
    const breakpoints = createBreakpoints({
        sm: "30em",
        md: "48em",
        lg: "62em",
        xl: "80em",
        "2xl": "96em",
    })

    const dummySessions = [
        {
            sessionName: 'The People vs. OJ',
            sessionId: 'UDC-013'
        },
        {
            sessionName: 'The impeachment of Bill Clinton',
            sessionId: 'UDC-014'
        },
        {
            sessionName: 'The Trial of Charles Manson',
            sessionId: 'UDC-013'
        },
        {
            sessionName: 'IDK any other famous trials',
            sessionId: 'UDC-013'
        },
        {
            sessionName: 'I hate filling dummy data',
            sessionId: 'UDC-013'
        },
        {
            sessionName: "what's up doc",
            sessionId: 'UDC-013'
        }
    ]
    return (
        <div className="triangularBackdrop"><Flex height="80vh" width="100%" flexDirection="column" alignItems="center" justifyContent="space-between">
            <Heading as="h1" size="2xl">Ongoing Sessions</Heading>
            <SimpleGrid columns={{ sm: 2, md: 4, lg: 5, "2xl": 6 }} spacing={10}>
                {dummySessions.map((session, index) => (
                    <div onClick={() => nav(`/session/${session.sessionId}`)}><SessionCards key={index} sessionName={session.sessionName} sessionId={session.sessionId} /></div>
                ))}
            </SimpleGrid>
            <div></div>
        </Flex></div>
    )
}
