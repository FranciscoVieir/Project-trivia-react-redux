import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';
import Configuracoes from './pages/Config';
import Header from './components/Header';

function App() {
  return (
    <div>
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
          <Header />
        </header>
      </div>
      <Switch>
        <Route exact path="/game" component={ Game } />
        <Route exact path="/" component={ Login } />
        <Route exact path="/config" component={ Configuracoes } />
      </Switch>
    </div>
  );
}

export default App;
