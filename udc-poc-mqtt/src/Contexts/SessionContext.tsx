import { createContext } from "react";
import { MqttHandler } from "../Models/mqttHandler";
import { SCClient } from "../Models/socketClusterClient";

export class SessionContextClass {
    socketClient: SCClient
    mqttClient: any
    constructor() {
        this.socketClient = new SCClient();
        this.mqttClient = new MqttHandler();
    }
}

export const SessionContext = createContext<any>(null);