import React, { useState } from 'react'
import { Flex, Heading, Box } from '@chakra-ui/layout'
import "../../../global.css"
import { MqttClientContext } from '../../../Contexts/mqttClientContext';
import { SessionStates } from '../../../Models/SessionStates';
import TopBar from '../../../Components/SessionTopBar/TopBar';
import OnGoing from '../../admin/States/onGoing';
import Pending from '../../admin/States/Pending';
export default function AdminView() {
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
    function startSession() {
        setSessionState(SessionStates.Ongoing);
        client?.publish('UDC-013', 'Admin started session');
    }
    switch (sessionState) {
        case SessionStates.Pending: return (<Pending startCurrentSession={startSession} />)
        case SessionStates.Ongoing: return (<OnGoing />)
        default: return (<Pending startCurrentSession={startSession} />)
    }

}
