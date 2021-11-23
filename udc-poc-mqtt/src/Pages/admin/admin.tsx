import { Flex, Heading, Box } from '@chakra-ui/layout'
import React from 'react'
import "../../global.css"
import { MqttClientContext } from '../../Contexts/mqttClientContext';
export default function Admin() {
    // const { mqttClient } = useMqttState();
    const { client } = React.useContext(MqttClientContext);
    function muteAll() {
        client.publish('UDC-013', 'Admin Muted All');
    }
    function kickAll() {
        client.publish('UDC-013', 'Admin kicked All');
    }
    function hitGavel() {
        client.publish('UDC-013', 'Admin hit Gavel');
    }
    return (
        <Flex flexDirection="column" justifyContent="center" alignItems="center" mt="3rem" height="100%" gap="3rem">
            <Heading as="h1">Welcome admin,</Heading>
            <p>connection status: {client ? "connected" : "not connected"} to session: UDC-013</p>
            <Flex flexDirection="row" width="100%" justifyContent="space-evenly" mt="2rem">
                <Flex flexDirection="column" justifyContent="center" alignItems="center" onClick={muteAll}>
                    <Box className="hoverable" width="3rem" height="3rem" boxShadow="lg" borderRadius="1rem" display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="2rem">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" className="bi bi-volume-mute" viewBox="0 0 16 16">
                            <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z" />
                        </svg>
                    </Box>
                    <p style={{ marginTop: "1rem" }}>Mute All</p>
                </Flex>
                <Flex flexDirection="column" justifyContent="center" alignItems="center" onClick={kickAll}>
                    <Box className="hoverable" width="3rem" height="3rem" boxShadow="lg" borderRadius="1rem" display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="2rem">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" className="bi bi-door-open" viewBox="0 0 16 16">
                            <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
                            <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z" />
                        </svg>
                    </Box>
                    <p style={{ marginTop: "1rem" }}>Kick</p>
                </Flex>
                <Flex flexDirection="column" justifyContent="center" alignItems="center" onClick={hitGavel}>
                    <Box className="hoverable" width="3rem" height="3rem" boxShadow="lg" borderRadius="1rem" display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="2rem">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" className="bi bi-hammer" viewBox="0 0 16 16">
                            <path d="M9.972 2.508a.5.5 0 0 0-.16-.556l-.178-.129a5.009 5.009 0 0 0-2.076-.783C6.215.862 4.504 1.229 2.84 3.133H1.786a.5.5 0 0 0-.354.147L.146 4.567a.5.5 0 0 0 0 .706l2.571 2.579a.5.5 0 0 0 .708 0l1.286-1.29a.5.5 0 0 0 .146-.353V5.57l8.387 8.873A.5.5 0 0 0 14 14.5l1.5-1.5a.5.5 0 0 0 .017-.689l-9.129-8.63c.747-.456 1.772-.839 3.112-.839a.5.5 0 0 0 .472-.334z" />
                        </svg>
                    </Box>
                    <p style={{ marginTop: "1rem" }}>Gavel</p>
                </Flex>
            </Flex>

        </Flex>
    )
}
