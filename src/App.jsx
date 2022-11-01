import React from 'react';
import LoginPage from './Components/LoginPage/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useStore } from './LoginAuthenticator/LoginContext';
import HomePage from './Components/HomePage.jsx';
import CardPage from './Components/CardPage/CardPage';

function App() {

  // let isLoggedIn = true;
  let store = useStore();

  return (
    <BrowserRouter>
      {store.isLoggedIn &&
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='card/:cardnumber' element={<CardPage />} />
        </Routes>
      } {!store.isLoggedIn &&
        <Routes>
          <Route path='/' element={<LoginPage />} />
        </Routes>

      }
    </BrowserRouter>
  )
}

export default App;