import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Enduser from './Pages/enduser/Enduser';
import Admin from './Pages/admin/admin';
import Home from './Pages/Home/Home';
import * as mqtt from 'mqtt';
import { MqttClientContext } from './Contexts/mqttClientContext';
import { mqttConnectionHandler } from './Utils/MQTT';
import { socketClusterConnectionHandler } from './Utils/socketCluster';
import { socketClientsContext } from './Contexts/SocketClientsContext';


function App() {
  const [client, setClient] = useState<mqtt.Client>();
  const [socketClients, setsocketClients] = useState<any>({
    socketCluster: null,
  });

  const mqttClientValue = useMemo(
    () => ({ client, setClient }),
    [client, setClient]
  );
  const socketsClientValue = useMemo(
    () => ({ socketClients, setsocketClients }),
    [socketClients, setsocketClients]
  );

  useEffect(() => {
    mqttConnectionHandler(setClient)
    socketClusterConnectionHandler(setsocketClients, socketClients)
  }, []
  )
  return (
    <socketClientsContext.Provider value={socketsClientValue}>
      <MqttClientContext.Provider value={mqttClientValue}>
        <Router>
          <Routes>
            <Route path="/enduser" element={<Enduser />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </MqttClientContext.Provider>
    </socketClientsContext.Provider>

  );
}

export default App;
// const mqttConnect = (host: any, mqttOption: any) => {
  //   setConnectStatus('Connecting');
  //   const client = mqtt.connect(host, mqttOption);
  // };
  // useEffect(() => {
  //   if (client != null) {
  //     mqttConnect("")
  //   }
  // }, [client]);
  // useEffect(() => {
  //   if (client) {
  //     console.log(client)
  //     client.on('connect', () => {
  //       setConnectStatus('Connected');
  //     });
  //     client.on('error', (err) => {
  //       console.error('Connection error: ', err);
  //       client.end();
  //     });
  //     client.on('reconnect', () => {
  //       setConnectStatus('Reconnecting');
  //     });
  //     client.on('message', (topic, message) => {
  //       const payload = { topic, message: message.toString() };
  //       setPayload(payload);
  //     });
  //   }
  // }, [client]);