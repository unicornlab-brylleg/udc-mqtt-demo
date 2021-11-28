import React, { useContext } from 'react';
import TopBar from '../../Components/SessionTopBar/TopBar';
import { AuthCtx } from '../../Contexts/authContext';
import { UserTypes } from '../../Models/userTypes';
import AdminView from './AdminView/AdminView';
import { useNavigate } from 'react-router';
import EndUser from './EndUserView/EndUser';
import { Flex } from '@chakra-ui/layout';
import { MqttClientContext } from '../../Contexts/mqttClientContext';
import { SessionContextClass } from '../../Contexts/SessionContext';
import { SessionContext } from '../../Contexts/SessionContext';

export default function Session() {
    const nav = useNavigate();
    const { user, setUser } = useContext(AuthCtx);
    const [sessionLogs, setSessionLogs] = React.useState<string[]>([]);
    const { client } = React.useContext(MqttClientContext);
    const [sessionHandlers, setSessionHandlers] = React.useState(new SessionContextClass());
    // React.useEffect(() => {
    //     if (!user) {
    //         let fetchedUser = localStorage.getItem('user');
    //         if (fetchedUser) {
    //             setUser(JSON.parse(fetchedUser));
    //             console.log(user);
    //         } else {
    //             nav('/login')
    //         }
    //     }
    // }, [user]);
    // React.useEffect(() => {
    //     if (client) {
    //         client?.subscribe('UDC-013');
    //         client?.on('message', (_: string, message: string) => {
    //             if (_ === 'UDC-013') {
    //                 setSessionLogs([...sessionLogs, message.toString()]);
    //             }
    //         });
    //     }
    // }, [sessionLogs]);
    React.useEffect(() => {
        setSessionHandlers(new SessionContextClass());
    }, []);
    const val = React.useMemo(
        () => ({ sessionHandlers, setSessionHandlers }),
        [sessionHandlers, setSessionHandlers]
    );

    return (
        <SessionContext.Provider value={val}><Flex flexDirection="column" width="100%">
            <TopBar sessionName="UDC" />
            {user?.type === UserTypes.ADMIN ? <AdminView /> : null}
            {user?.type === UserTypes.USER ? <EndUser /> : null}

        </Flex></SessionContext.Provider>
    );
}
