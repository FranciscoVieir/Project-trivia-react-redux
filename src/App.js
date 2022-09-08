import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Games from './pages/Games';

function App() {
  return (
    <Switch>
      <Route exact path="/games" component={ Games } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
