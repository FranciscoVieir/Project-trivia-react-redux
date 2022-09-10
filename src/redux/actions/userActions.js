import { PLAYER } from './index';

const userAction = (name, email) => ({
  type: PLAYER,
  name,
  email });

export default userAction;
