import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import userAction from '../redux/actions/userActions';
import store from '../redux/store';
import { fetchApTokens } from '../services';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      namePlayer: '',
      playerEmail: '',
      isDisable: true,
    };
  }

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      this.validator();
    });
  };

  validator = () => {
    const { namePlayer, playerEmail } = this.state;
    const infoInput = playerEmail.length > 0 && namePlayer.length > 0;
    this.setState({ isDisable: !infoInput });
  };

  onClick = async (event) => {
    const { history } = this.props;
    const { namePlayer, playerEmail } = this.state;
    event.preventDefault();
    store.dispatch(userAction(namePlayer, playerEmail));

    const { token } = await fetchApTokens();

    if (token) {
      localStorage.setItem('token', token);
      history.push('/game');
    }
  };

  render() {
    const { namePlayer, playerEmail, isDisable } = this.state;
    return (
      <div>
        <div>Login</div>
        <label htmlFor="namePlayer">
          <input
            type="text"
            id="namePlayer"
            name="namePlayer"
            value={ namePlayer }
            placeholder="Nome"
            onChange={ this.onChange }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="playerEmail">
          <input
            type="email"
            id="playerEmail"
            name="playerEmail"
            value={ playerEmail }
            placeholder="Email"
            onChange={ this.onChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          disabled={ isDisable }
          data-testid="btn-play"
          type="submit"
          onClick={ this.onClick }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => {
            const { history } = this.props;
            history.push('/config');
          } }
        >
          Configurações
        </button>

      </div>
    );
  }
}

Login.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

connect()(Login);
