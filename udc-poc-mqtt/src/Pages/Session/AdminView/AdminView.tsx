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
import { AdminMqttActions } from '../../../Models/AdminActions';
import { socketClientsContext } from '../../../Contexts/SocketClientsContext';
import { SCClient } from '../../../Models/socketClusterClient';
import { useLocation } from 'react-router';
import { SessionContext, SessionContextClass } from '../../../Contexts/SessionContext';
import { MqttHandler } from '../../../Models/mqttHandler';
export default function AdminView() {
    const location = useLocation();
    const { client } = React.useContext(MqttClientContext);
    const { sessionHandlers, setSessionHandlers } = React.useContext(SessionContext);
    const [sessionState, setSessionState] = useState(SessionStates.Pending);
    const [socketClient, setSocketClient] = useState<SCClient>(sessionHandlers.socketClient);
    const [mqttHandler, setMqttHandler] = useState<MqttHandler>(sessionHandlers.mqttHandler);
    const nav = useNavigate();
    let sessionId = location.pathname.split('/')[2];

    function muteAll() {
        socketClient?.adminMqttTransmitter(sessionId, {
            AdminAction: AdminMqttActions.MuteEveryone,
            message: 'Admin Muted All'
        })

    }
    function unmuteAll() {
        socketClient?.adminMqttTransmitter(sessionId, {
            AdminAction: AdminMqttActions.UnmuteEveryone,
            message: 'Admin Unmuted All'
        })
    }
    function kickAll() {
        socketClient?.adminMqttTransmitter(sessionId, {
            AdminAction: AdminMqttActions.KickEveryone,
            message: 'Admin Kicked All'
        })
    }


    function hitGavel() {
        socketClient?.adminMqttTransmitter(sessionId, {
            AdminAction: AdminMqttActions.HitGavel,
            message: 'Admin Hit Gavel'
        })
    }

    function startSession() {
        setSessionState(SessionStates.Ongoing);
        socketClient?.adminMqttTransmitter(sessionId, {
            AdminAction: AdminMqttActions.MakeSessionOngoing,
            message: 'Admin Started Session'
        })
    }
    function cancelSession() {
        setSessionState(SessionStates.Cancelled);
        socketClient?.adminMqttTransmitter(sessionId, {
            AdminAction: AdminMqttActions.MakeSessionCancelled,
            message: 'Admin Cancelled Session'
        })
        nav('/sessions')
    }

    function resumeSession() {
        setSessionState(SessionStates.Ongoing);
        socketClient?.adminMqttTransmitter(sessionId, {
            AdminAction: AdminMqttActions.MakeSessionOngoing,
            message: 'Admin Resumed Session'
        })
    }
    function holdSession() {
        setSessionState(SessionStates.OnHold);
        socketClient?.adminMqttTransmitter(sessionId, {
            AdminAction: AdminMqttActions.MakeSessionOnHold,
            message: 'Admin Hold Session'
        })
    }
    function endSession() {
        setSessionState(SessionStates.Ended);
        socketClient?.adminMqttTransmitter(sessionId, {
            AdminAction: AdminMqttActions.MakeSessionEnded,
            message: 'Admin Ended Session'
        })
        client?.publish('UDC-013', 'Admin ended session');
    }
    switch (sessionState) {
        case SessionStates.Pending: return (<Pending startCurrentSession={startSession} cancelCurrentSession={cancelSession} />)
        case SessionStates.Ongoing: return (<OnGoing putSessionOnHold={holdSession} endCurrentSession={endSession} unMuteAll={unmuteAll} muteAll={muteAll} kickAll={kickAll} triggerGavel={hitGavel} />)
        case SessionStates.OnHold: return (<OnHold resumeCurrentSession={resumeSession} />)
        case SessionStates.Ended: return (<Ended />)
        default: return (<Pending startCurrentSession={startSession} cancelCurrentSession={cancelSession} />)
    }

}
