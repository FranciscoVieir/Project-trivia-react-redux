import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Configuracoes from './pages/Config';

function App() {
  return (
    <Switch>
      <Route exact path="/game" component={ Game } />
      <Route exact path="/" component={ Login } />
      <Route exact path="/config" component={ Configuracoes } />
    </Switch>
  );
}

export default App;
