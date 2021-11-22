import React, { createContext, useEffect, useState } from 'react';

import api from '../services/api';
import history from '../services/history';

const Context = createContext({});

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  }, []);

  async function signIn(login, password) {
    const { data } = await api.post('/users/authenticate', {
      login,
      password,
    });

    localStorage.setItem('token', JSON.stringify(data.token));

    api.defaults.headers.Authorization = `Bearer ${data.token}`;
    setAuthenticated(true);

    history.push('/dashboard');
  }

  async function signOut() {
    api.defaults.headers.Authorization = undefined;
    localStorage.clear();
    setAuthenticated(false);
    history.push('/');
  }

  return (
    <Context.Provider
      value={{
        authenticated,
        setAuthenticated,
        signIn,
        signOut,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, AuthProvider };
