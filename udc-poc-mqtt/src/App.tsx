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
import Sessions from './Pages/SessionsGallery/SessionsGallery';
import Login from './Pages/Login/Login';
import { AuthCtx } from "./Contexts/authContext"
import Session from './Pages/Session/Session';
import { useNavigate } from 'react-router';
import './global.css'


function App() {
  const [client, setClient] = useState<mqtt.Client>();
  const [socketClient, setSocketClient] = useState<any>({
    socketCluster: null,
  });
  const [user, setUser] = useState<any>()

  const mqttClientValue = useMemo(
    () => ({ client, setClient }),
    [client, setClient]
  );
  const socketsClientValue = useMemo(
    () => ({ socketClient, setSocketClient }),
    [socketClient, setSocketClient]
  );
  const authValue = useMemo(
    () => ({ user, setUser }),
    [user, setUser]
  );


  useEffect(() => {
    let fetchedUser = localStorage.getItem('user');
    if (fetchedUser) {
      setUser(JSON.parse(fetchedUser));
    }
    console.log(user)
    mqttConnectionHandler(setClient)
    // socketClusterConnectionHandler(setSocketClient, socketClient)
  }, []
  )
  return (
    <div className="view">
      <AuthCtx.Provider value={authValue}>
        <socketClientsContext.Provider value={socketsClientValue}>
          <MqttClientContext.Provider value={mqttClientValue}>
            {user ?
              <Router>
                <Routes>
                  <Route path="/enduser" element={<Enduser />} />
                  <Route path="/Admin" element={<Admin />} />
                  <Route path="/Sessions" element={<Sessions />} />
                  <Route path="/Session/:id" element={<Session />} />
                  <Route path="/Login" element={<Login />} />
                  <Route path="/" element={<Home />} />
                </Routes>
              </Router> :
              <Router>
                <Routes>
                  <Route path="*" element={<Login />} />
                </Routes>
              </Router>
            }
          </MqttClientContext.Provider>
        </socketClientsContext.Provider>
      </AuthCtx.Provider>
    </div>
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