import React from 'react';
import { Router } from 'react-router-dom';

import { AuthProvider } from './context/authContext';
import Routes from './routes';
import history from './services/history';

function App() {
  return (
    <AuthProvider>
      <Router history={history}>
        <Routes />
      </Router>
    </AuthProvider>
  );
}

export default App;
