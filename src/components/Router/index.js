import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { Context } from '../../context/authContext';

function RouteWrapper({ isPrivate, ...rest }) {
  const { authenticated } = useContext(Context);

  if (isPrivate && !authenticated) {
    return <Redirect to="/" />;
  }

  if (!isPrivate && authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return <Route {...rest} />;
}

export default RouteWrapper;
