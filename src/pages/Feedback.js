import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { resetPoints } from '../redux/actions/gameActions';

class Feedback extends Component {
  rankingButton = () => {
    const { history, name, picture, score, dispatch } = this.props;
    history.push('/ranking');
    const arr = [{
      name,
      score,
      picture,
    }];
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    if (!ranking) {
      localStorage.setItem('ranking', JSON.stringify(arr));
    } else if (ranking) {
      const newArray = [...ranking, arr[0]];
      newArray.sort((a, b) => b.score - a.score);
      localStorage.setItem('ranking', JSON.stringify(newArray));
    }
    dispatch(resetPoints());
  };

  render() {
    const { assertions, score, history, dispatch } = this.props;
    const feedbackNumber = 3;
    const feedback = () => {
      if (assertions < feedbackNumber) {
        return 'Could be better...';
      }
      return 'Well Done!';
    };

    return (
      <div>
        <Header />
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <p data-testid="feedback-text">{feedback()}</p>
        <button
          type="button"
          onClick={ () => {
            dispatch(resetPoints());
            history.push('/');
          } }
          data-testid="btn-play-again"
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.rankingButton }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  picture: state.player.gravatarEmail,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
