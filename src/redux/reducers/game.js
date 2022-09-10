import { REQUEST_QUESTIONS, SAVED_QUESTIONS, FAILED_QUESTIONS } from '../actions';

const initialState = {
  payload: [],
};

const game = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return {
      ...state,
    };
  case SAVED_QUESTIONS:
    return {
      ...state,
      payload,
    };
  case FAILED_QUESTIONS:
    return {
      ...state,
      error: payload,
    };
  default:
    return state;
  }
};

export default game;
