import React from 'react'
import { SessionStates } from '../../../Models/SessionStates';
interface endUserProps {
    sessionId?: string;
    sessionState: SessionStates;
}
export default function EndUser({ sessionState }: endUserProps) {
    switch (sessionState) {
        case SessionStates.Pending: return (<div>Pending</div>);
        case SessionStates.Ongoing: return (<div>Ongoing</div>);
        case SessionStates.OnHold: return (<div>OnHold</div>);
        case SessionStates.Ended: return (<div>Ended</div>);
        default: return (<div>Cancelled </div>);
    }
}
