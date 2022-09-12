import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchApiQuestions from '../redux/actions/gameActions';
// import Button from '../components/Button';

class Game extends Component {
  componentDidMount() {
    this.requestQuestions();
  }

  onClickButton = (event) => {
    // const { name } = event;
    // const { results: { correct_answer: correct } } = this.props;
    console.log(event.target.name);
    // event.target.style.border = ('3px solid rgb(6, 240, 15)');
    // console.log(e.target.name);
    // console.log(correct);
    if (event.target.name === 'correct-answer') {
      event.target.style.border = ('3px solid rgb(6, 240, 15)');
      console.log('acertei');
    }
    if (event.target.name === 'wrong-answer') {
      event.target.style.border = ('3px solid rgb(255, 0, 0)');
      console.log('errei');
    }
  };

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
                name="wrong-answer"
                data-testid={ `wrong-answer-${index}` }
                onClick={ (e) => this.onClickButton(e) }

              >
                {array}
              </button>))}
            {
              aleatory % 2 !== 0
                ? (
                  <button
                    type="button"
                    name="correct-answer"
                    data-testid="correct-answer"
                    onClick={ (e) => this.onClickButton(e) }
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
