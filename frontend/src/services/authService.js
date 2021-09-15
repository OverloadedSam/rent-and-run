const tokenKey = 'token';
const userKey = 'user';

const saveUserAndAuthToken = (user, token) => {
  localStorage.setItem(userKey, JSON.stringify(user));
  localStorage.setItem(tokenKey, token);
};

const getCurrentUser = () => JSON.parse(localStorage.getItem(userKey)) || null;

const getAuthToken = () => localStorage.getItem(tokenKey) || null;

const logoutUser = () => {
  localStorage.removeItem(userKey);
  localStorage.removeItem(tokenKey);
};

export default {
  saveUserAndAuthToken,
  getCurrentUser,
  getAuthToken,
  logoutUser,
};
