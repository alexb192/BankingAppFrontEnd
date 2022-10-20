import React from 'react';
import LoginPage from './Components/LoginPage/LoginPage';
import { StoreProvider } from './LoginAuthenticator/LoginContext';

function App() {

  return (
    <StoreProvider>
      <LoginPage />
    </StoreProvider>
  )

}

export default App;