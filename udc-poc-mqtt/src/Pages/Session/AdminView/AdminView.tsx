import React, { useState } from 'react'
import { Flex, Heading, Box } from '@chakra-ui/layout'
import "../../../global.css"
import { MqttClientContext } from '../../../Contexts/mqttClientContext';
import { SessionStates } from '../../../Models/SessionStates';
import TopBar from '../../../Components/SessionTopBar/TopBar';
import OnGoing from './States/onGoing';
import Pending from './States/Pending';
import { useNavigate } from 'react-router';
import OnHold from './States/onHold';
import Ended from './States/Ended';
export default function AdminView() {
    const { client } = React.useContext(MqttClientContext);
    const [sessionState, setSessionState] = useState(SessionStates.Pending);
    const nav = useNavigate();

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
    function cancelSession() {
        setSessionState(SessionStates.Cancelled);
        client?.publish('UDC-013', 'Admin cancelled session');
        nav('/sessions')
    }
    function resumeSession() {
        setSessionState(SessionStates.Ongoing);
        client?.publish('UDC-013', 'Admin resumed session');
    }
    function holdSession() {
        setSessionState(SessionStates.OnHold);
        client?.publish('UDC-013', 'Admin put session on hold');
    }
    function endSession() {
        setSessionState(SessionStates.Ended);
        client?.publish('UDC-013', 'Admin ended session');
    }
    switch (sessionState) {
        case SessionStates.Pending: return (<Pending startCurrentSession={startSession} cancelCurrentSession={cancelSession} />)
        case SessionStates.Ongoing: return (<OnGoing putSessionOnHold={holdSession} endCurrentSession={endSession} />)
        case SessionStates.OnHold: return (<OnHold resumeCurrentSession={resumeSession} />)
        case SessionStates.Ended: return (<Ended />)
        default: return (<Pending startCurrentSession={startSession} cancelCurrentSession={cancelSession} />)
    }

}
