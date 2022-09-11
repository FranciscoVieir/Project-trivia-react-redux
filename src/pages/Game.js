import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchApiQuestions from '../redux/actions/gameActions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      isDisable: false,
      timer: 30,
      showNextBtn: false,
      count: 0,
      aleatory: 0,
    };
  }

  componentDidMount() {
    console.log('didMount');
    this.requestQuestions();
    this.aleatoryNumber();
  }

  answerTimer = () => {
    const { timer } = this.state;
    const oneSecond = 1000;
    let time = timer;
    this.intervalID = setInterval(() => {
      if (time > 0) {
        time -= 1;
        this.setState({ timer: time });
      } else if (time === 0) {
        this.setState({ isDisable: true });
      }
    }, oneSecond);
  };

  requestQuestions = () => {
    const { dispatch, history } = this.props;
    const token = localStorage.getItem('token');
    dispatch(fetchApiQuestions(token, history));
    this.answerTimer();
  };

  onClickAnswer = ({ target }) => {
    console.log(target);
    this.setState({
      showNextBtn: true,
    });
  };

  onClickNext = () => {
    let { count } = this.state;
    clearInterval(this.intervalID);
    this.aleatoryNumber();
    this.setState({
      count: count += 1,
      showNextBtn: false,
      timer: 30,
    }, () => {
      this.answerTimer();
    });
  };

  aleatoryNumber = () => {
    const NUM = 10;
    const aleatory = Math.floor(Math.random() * NUM + 1);
    this.setState({ aleatory });
  };

  render() {
    const { game } = this.props;
    console.log('render');
    const { isDisable, timer, showNextBtn, count, aleatory } = this.state;
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
                    disabled={ isDisable }
                    onClick={ this.onClickAnswer }
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
                disabled={ isDisable }
                onClick={ this.onClickAnswer }
              >
                {array}
              </button>))}
            {
              aleatory % 2 !== 0
                ? (
                  <button
                    type="button"
                    data-testid="correct-answer"
                    disabled={ isDisable }
                    onClick={ this.onClickAnswer }
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
          {questions[count]}
          <p>{timer}</p>
        </div>
        {showNextBtn && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.onClickNext }
          >
            Next
          </button>
        )}
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
