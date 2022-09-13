import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const listRanking = ranking.map(({ name, score, picture }, i) => (
      <div key={ i }>
        <p data-testid={ `player-name-${i}` }>{name}</p>
        <p data-testid={ `player-score-${i}` }>{score}</p>
        <img src={ `https://www.gravatar.com/avatar/${MD5(picture).toString()}` } alt={ name } />
      </div>
    ));
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Tela Inicial
        </button>
        {listRanking}
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;

export default Ranking;
