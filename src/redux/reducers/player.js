import { PLAYER, RESET_POINTS, SEND_POINTS } from '../actions';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = initialState, action) => {
  switch (action.type) {
  case PLAYER:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  case SEND_POINTS:
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };
  case RESET_POINTS:
    return {
      ...state,
      score: action.payload,

    };
  default:
    return state;
  }
};

export default player;
