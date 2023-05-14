import React, { useEffect } from 'react';
import LoginPage from './Components/LoginPage/LoginPage';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useStore, useStoreUpdate } from './LoginAuthenticator/LoginContext';
import HomePage from './Components/HomePage.jsx';
import CardPage from './Components/CardPage/CardPage';
import TransferPage from './Components/TransferPage/TransferPage';
import { withCookies } from 'react-cookie';
import { useState } from 'react';

// we need any time someone pops into our site to first have their cookies checked

function App(props) {

  const storeLogInInformation = useStoreUpdate();
  const store = useStore();
  const [loaded, setLoaded] = useState(false);
  // if the user already has a username and key try authenticating with it
  // use onComponentMount, we don't want it to try re-authenticating

  useEffect(() => {
    if (!store.username) {
      let cookies = props.cookies.get('auth');
    if (!cookies) return; // there is no cookie, don't try authenticating.
    const resp = axios.post(`${process.env.REACT_APP_API}authenticate`, {username: cookies.username, key: cookies.key});
    resp.then((resp) => {
      if (resp.status === 200)
      {
        storeLogInInformation(cookies.username, true, cookies.key);
      }
      setLoaded(true);
    })
    }
  })

  return (
    <BrowserRouter>
      {store.isLoggedIn && loaded &&
        <Routes>
          <Route path='/' element={<HomePage cookies={props.cookies}/>} />
          <Route path='card/:cardnumber' element={<CardPage cookies={props.cookies} />} />
          <Route path='/transfer' element={<TransferPage cookies={props.cookies}/>} />
        </Routes>
      } {!store.isLoggedIn && loaded &&
        <Routes>
          <Route path='/' element={<LoginPage />} cookies={props.cookies} />
        </Routes>
      }
    </BrowserRouter>
  )
}

export default withCookies(App);