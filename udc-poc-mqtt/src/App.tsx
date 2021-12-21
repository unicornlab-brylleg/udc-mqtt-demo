import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Enduser from './Pages/enduser/Enduser';
import Admin from './Pages/admin/admin';
import Home from './Pages/Home/Home';
import Sessions from './Pages/SessionsGallery/SessionsGallery';
import Login from './Pages/Login/Login';
import { AuthCtx } from "./Contexts/authContext"
import Session from './Pages/Session/Session';
import './global.css'
import { registerEvents} from './Handlers/registerEvents'


function App() {

  const [user, setUser] = useState<any>()
  const authValue = useMemo(
    () => ({ user, setUser }),
    [user, setUser]
  );


  useEffect(() => {
    registerEvents()
    let fetchedUser = localStorage.getItem('user');
    if (fetchedUser) {
      setUser(JSON.parse(fetchedUser));
    }
    console.log(user)
  }, []
  )
  return (
    <div className="view">
      <AuthCtx.Provider value={authValue}>

        {user ?
          <Router>
            <Routes>
              <Route path="/enduser" element={<Enduser />} />
              <Route path="/Admin" element={<Admin />} />
              <Route path="/Sessions" element={<Sessions />} />
              <Route path="/Session/:id" element={<Session />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/" element={<Sessions />} />
            </Routes>
          </Router> :
          <Router>
            <Routes>
              <Route path="*" element={<Login />} />
            </Routes>
          </Router>
        }

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