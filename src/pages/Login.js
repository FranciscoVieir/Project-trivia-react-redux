import React from 'react';
import { connect } from 'react-redux';

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
        <button disabled={ isDisable } data-testid="btn-play" type="submit">
          Play
        </button>
      </div>
    );
  }
}

connect()(Login);
