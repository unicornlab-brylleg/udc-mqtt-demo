import React, { useState, useEffect } from 'react'
import { MqttClientContext } from '../../../Contexts/mqttClientContext';
import { SessionStates } from '../../../Models/SessionStates';
export default function EndUser() {
    const { client } = React.useContext(MqttClientContext);

    const [sessionState, setSessionState] = useState<SessionStates>(SessionStates.Pending);
    React.useEffect(() => {
        client?.subscribe('UDC-013');
        client?.on('message', (topic: string, message: string) => {
            if (topic === 'UDC-013') {
                let msg = JSON.parse(message.toString());
                console.log(msg);
                if (msg.AdminAction < 5) {
                    setSessionState(msg.AdminAction);
                }
            }
        });
    }, [sessionState]);
    switch (sessionState) {
        case SessionStates.Pending: return (<div>Pending</div>);
        case SessionStates.Ongoing: return (<div>Ongoing</div>);
        case SessionStates.OnHold: return (<div>OnHold</div>);
        case SessionStates.Ended: return (<div>Ended</div>);
        default: return (<div>Cancelled</div>);
    }
}
