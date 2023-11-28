import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { StoreProvider } from './LoginAuthenticator/LoginContext';
import { CookiesProvider } from 'react-cookie';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <React.StrictMode>
      <StoreProvider>
        <App/>
      </StoreProvider>
    </React.StrictMode>
  </CookiesProvider>
);