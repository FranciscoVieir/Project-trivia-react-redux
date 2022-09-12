import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchApiQuestions, { sendPoints } from '../redux/actions/gameActions';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      isDisable: false,
      timer: 30,
      showNextBtn: false,
      count: 0,
      aleatory: 0,
      teste: false,
    };
  }

  componentDidMount() {
    // console.log('didMount');
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
    this.setState({ teste: true });
    const { dispatch } = this.props;
    const { timer } = this.state;
    const difficulty = target.parentNode.parentNode.id;
    const basePoint = 10;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    const answerType = target.className;
    let points = basePoint;
    this.setState({
      showNextBtn: true,
    });
    if (answerType === 'correct') {
      if (difficulty === 'hard') {
        points += (timer * hard);
      } else if (difficulty === 'medium') {
        points += (timer * medium);
      } else if (difficulty === 'easy') {
        points += (timer * easy);
      }
      dispatch(sendPoints(points));
    }
  };

  onClickNext = () => {
    this.setState({ teste: false });
    const { history } = this.props;
    const lastQuestion = 5;
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
    if (count === lastQuestion) {
      history.push('/feedback');
    }
  };

  aleatoryNumber = () => {
    const NUM = 10;
    const aleatory = Math.floor(Math.random() * NUM + 1);
    this.setState({ aleatory });
  };

  render() {
    const { teste } = this.state;
    // console.log('render');
    const { game } = this.props;
    const { isDisable, timer, showNextBtn, count, aleatory } = this.state;
    const questions = game
      .map((
        { question, category, correct_answer: correct,
          incorrect_answers: incorrect, difficulty },
        index,
      ) => (
        <div
          key={ index }
          id={ difficulty }
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
                    name="correct-answer"
                    style={ { border: teste ? '3px solid rgb(6, 240, 15)' : '' } }
                    data-testid="correct-answer"
                    className="correct"
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
                name="wrong-answer"
                style={ { border: teste ? '3px solid rgb(255, 0, 0)' : '' } }
                data-testid={ `wrong-answer-${index}` }
                className="wrong"
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
                    name="correct-answer"
                    style={ { border: teste ? '3px solid rgb(6, 240, 15)' : '' } }
                    data-testid="correct-answer"
                    className="correct"
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
        <Header />
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
