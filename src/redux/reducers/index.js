import { combineReducers } from 'redux';
import user from './player';
import game from './game';

const rootReducers = combineReducers({
  user,
  game,
});

export default rootReducers;
