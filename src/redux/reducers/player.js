import { USER } from '../actions';

const initialState = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const player = (state = initialState, action) => {
  switch (action.type) {
  case USER:
    return action.value;
  default:
    return state;
  }
};

export default player;
