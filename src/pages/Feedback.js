import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
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
        <p data-testid="feedback-text">{feedback()}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
