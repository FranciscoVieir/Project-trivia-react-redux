import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { userName, email } = this.props;
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
          data-testid="header-profile-picture"
          alt=""
        />
        <p data-testid="header-player-name">{userName}</p>
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  userName: state.player.name,
  email: state.player.gravatarEmail,
});

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
