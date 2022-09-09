import { USER } from './index';

const userAction = (name, email) => ({
  type: USER,
  name,
  email });

export default userAction;
