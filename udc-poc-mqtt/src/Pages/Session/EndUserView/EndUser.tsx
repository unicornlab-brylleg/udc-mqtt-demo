import React, { useState } from 'react'
import { MqttClientContext } from '../../../Contexts/mqttClientContext';
import { SessionStates } from '../../../Models/SessionStates';
export default function EndUser() {
    const { client } = React.useContext(MqttClientContext);
    const [sessionState, setSessionState] = useState(SessionStates.Pending);
    switch (sessionState) {
        case SessionStates.Pending: return (<div>Pending</div>);
        case SessionStates.Ongoing: return (<div>Ongoing</div>);
        case SessionStates.OnHold: return (<div>OnHold</div>);
        case SessionStates.Ended: return (<div>Ended</div>);
        default: return (<div>Cancelled</div>);
    }
}
