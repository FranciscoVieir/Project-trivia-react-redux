import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Games from './pages/Games';
import Configuracoes from './pages/Config';

function App() {
  return (
    <Switch>
      <Route exact path="/games" component={ Games } />
      <Route exact path="/" component={ Login } />
      <Route exact path="/config" component={ Configuracoes } />
    </Switch>
  );
}

export default App;
