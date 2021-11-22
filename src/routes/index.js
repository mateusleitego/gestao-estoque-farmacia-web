import React from 'react';
import { Switch } from 'react-router-dom';

import { MedicinesContext } from '../context/medicinesContext';

import Form from '../components/Form';
import Route from '../components/Router';
import Dashboard from '../components/Dashboard';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Form} />
      <MedicinesContext>
        <Route exact path="/dashboard" component={Dashboard} isPrivate />
      </MedicinesContext>
    </Switch>
  );
}

export default Routes;
