import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';
import Configuracoes from './pages/Config';
import Feedback from './pages/Feedback';
import Ranking from './components/Ranking';

function App() {
  return (
    <div>
      <div className="App">
        <div className="App-body">
          <img src={ logo } className="App-logo" alt="logo" />
          <Switch>
            <Route exact path="/game" component={ Game } />
            <Route exact path="/" component={ Login } />
            <Route exact path="/config" component={ Configuracoes } />
            <Route exact path="/feedback" component={ Feedback } />
            <Route exact path="/ranking" component={ Ranking } />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
