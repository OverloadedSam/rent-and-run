import { auth } from '../services';

const Logout = () => {
  auth.logoutUser();
  window.location = '/signin';
  return null;
};

export default Logout;
