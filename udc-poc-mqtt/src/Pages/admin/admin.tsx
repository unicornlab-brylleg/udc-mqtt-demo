import { Flex, Heading, Box } from '@chakra-ui/layout'
import React, { useState } from 'react'
import "../../global.css"
import { MqttClientContext } from '../../Contexts/mqttClientContext';
import { SessionStates } from '../../Models/SessionStates';
import TopBar from '../../Components/SessionTopBar/TopBar';
import OnGoing from './States/onGoing';
export default function Admin() {
    // const { mqttClient } = useMqttState();
    const { client } = React.useContext(MqttClientContext);
    const [sessionState, setSessionState] = useState(SessionStates.Pending);
    function muteAll() {
        client.publish('UDC-013', 'Admin Muted All');
    }
    function kickAll() {
        client.publish('UDC-013', 'Admin kicked All');
    }
    function hitGavel() {
        client.publish('UDC-013', 'Admin hit Gavel');
    }

    switch (sessionState) {
        case SessionStates.Pending: return (
            <>
                <TopBar sessionName="UDC" />
                <OnGoing />
            </>
        )
        default: return (
            <>
                <TopBar sessionName="UDC" />
                <OnGoing />
            </>
        )
    }
}
