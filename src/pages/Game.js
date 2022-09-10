import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchApiQuestions from '../redux/actions/gameActions';

class Game extends Component {
  componentDidMount() {
    this.requestQuestions();
  }

  requestQuestions = () => {
    const { dispatch, history } = this.props;
    const token = localStorage.getItem('token');
    dispatch(fetchApiQuestions(token, history));
  };

  render() {
    const { game } = this.props;
    const NUM = 10;
    const aleatory = Math.floor(Math.random() * NUM + 1);
    const questions = game
      .map((
        { question, category, correct_answer: correct, incorrect_answers: incorrect },
        index,
      ) => (
        <div
          key={ index }
        >
          <p
            data-testid="question-category"
          >
            {category}
          </p>
          <p
            data-testid="question-text"
          >
            {question}
          </p>
          <div data-testid="answer-options">
            {
              aleatory % 2 === 0
                ? (
                  <button
                    type="button"
                    data-testid="correct-answer"
                  >
                    {correct}
                  </button>
                )
                : (<div />)
            }
            {incorrect.map((array, i) => (
              <button
                key={ i }
                type="button"
                data-testid={ `wrong-answer-${index}` }
              >
                {array}
              </button>))}
            {
              aleatory % 2 !== 0
                ? (
                  <button
                    type="button"
                    data-testid="correct-answer"
                  >
                    {correct}
                  </button>
                )
                : (<div />)
            }
          </div>
        </div>
      ));

    return (
      <div>
        <div>
          <h1>Games</h1>
          {questions[0]}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func,
  game: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

const mapStateToProps = (store) => ({
  game: store.game.payload,
});

export default connect(mapStateToProps)(Game);
