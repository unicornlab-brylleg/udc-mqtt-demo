import React, { useContext } from 'react';
import TopBar from '../../Components/SessionTopBar/TopBar';
import { AuthCtx } from '../../Contexts/authContext';
import { UserTypes } from '../../Models/userTypes';
import AdminView from './AdminView/AdminView';
import { useNavigate } from 'react-router';
import EndUser from './EndUserView/EndUser';
import { Flex } from '@chakra-ui/layout';
import { SessionContextClass } from '../../Contexts/SessionContext';
import { SessionContext } from '../../Contexts/SessionContext';
import { MqttHandler } from '../../Models/mqttHandler';
import { SCClient } from '../../Models/socketClusterClient';
import { useLocation } from 'react-router';
import { SessionStates } from '../../Models/SessionStates';
import { createStandaloneToast } from "@chakra-ui/react"
import { useToast } from '@chakra-ui/toast';



export default function Session() {
    const location = useLocation();
    const nav = useNavigate();
    const { user, setUser } = useContext(AuthCtx);
    const [sessionState, setSessionState] = React.useState(SessionStates.Pending);
    const [sessionHandlers, setSessionHandlers] = React.useState<SessionContextClass | null>(null);
    const [mqttClient, setMqttClient] = React.useState<MqttHandler>();
    const [socketClient, setSocketClient] = React.useState<SCClient | null>(null);
    const [sessionDetails, setSessionDetails] = React.useState<any>({
        sessionChatLogs: [],
        sessionEventLogs: [],
        sessionParticipants: []
    });
    const toast = useToast();

    // const customToast = createStandaloneToast({ theme: yourCustomTheme })
    React.useEffect(() => {
        if (!user) {
            let fetchedUser = localStorage.getItem('user');
            if (fetchedUser) {
                setUser(JSON.parse(fetchedUser));
                console.log("user");

            } else {
                nav('/login')
            }
        }
    }, []);

    const setChatLogsCallback = React.useCallback((chatLogs: string[]) => {
        setSessionDetails({ ...sessionDetails, sessionChatLogs: chatLogs });
    }, [sessionDetails]);
    const appendSessionEvents = React.useCallback((eventLogs: any) => {
        let old = sessionDetails.sessionEventLogs;
        let jason = JSON.parse(eventLogs);
        old.push(jason.message);
        setSessionDetails({ ...sessionDetails, sessionEventLogs: old });
        if (jason.AdminAction < 5) {
            setSessionState(jason.AdminAction);
        }
    }, [sessionDetails]);
    const appendSessionUsers = React.useCallback((users: string) => {
        if (!sessionDetails.sessionParticipants.includes(users)) {
            console.log(`adding user ${users}`);
            let old = sessionDetails.sessionParticipants
            old.push(users);
            setSessionDetails({ ...sessionDetails, sessionParticipants: old });
        }
    }, [sessionDetails]);
    const announceAdminActions = React.useCallback(() => {
        toast({
            position: "bottom-left",
            render: () => (
                <Flex color="white" p={3} bg="blue.500" borderRadius="md">
                    You have been muted admin
                </Flex>
            ),
        })
    }, [sessionDetails]);
    React.useEffect(() => {
        let sessionId = location.pathname.split('/')[2];
        if (!sessionHandlers) {
            let classInstance = new SessionContextClass();
            setSessionHandlers(classInstance);
            setSocketClient(classInstance.socketClient);
            setMqttClient(classInstance.mqttClient);
        }
        socketClient?.handleChatMessage(sessionId, sessionDetails.sessionChatLogs, setChatLogsCallback);
        socketClient?.channelJoinListener(sessionId, appendSessionUsers);
        socketClient?.handleDirectAdminActions(announceAdminActions);
        mqttClient?.subToTopic(sessionId)
        mqttClient?.onTopicPublished(sessionId, appendSessionEvents);
    }, [mqttClient, socketClient]);


    const val = React.useMemo(
        () => ({ sessionHandlers, setSessionHandlers }),
        [sessionHandlers, setSessionHandlers]
    );

    return (
        <SessionContext.Provider value={val}><Flex flexDirection="column" width="100%">
            <TopBar sessionName="UDC" sessionDetails={sessionDetails} />
            {user?.type === UserTypes.ADMIN ? <AdminView socketClient={socketClient} /> : null}
            {user?.type === UserTypes.USER ? <EndUser sessionState={sessionState} /> : null}

        </Flex></SessionContext.Provider>
    );
}
