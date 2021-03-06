import { http, auth } from '../../services';
import { userTypes as actions } from '../action-types';

const registerUser = (payload) => async (dispatch) => {
  dispatch({ type: actions.USER_REGISTER_REQUESTED });

  try {
    const { data } = await http.post('/register', payload);
    dispatch({
      type: actions.USER_REGISTER_SUCCEEDED,
      payload: data,
    });

    const { token } = data;
    const user = {
      id: data.data.id,
      name: data.data.first_name,
      email: data.data.email,
    };

    auth.saveUserAndAuthToken(user, token);
  } catch (error) {
    dispatch({
      type: actions.USER_REGISTER_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const resetRegisterUser = () => (dispatch) => {
  dispatch({ type: actions.USER_REGISTER_RESET });
};

const loginUser = (payload) => async (dispatch) => {
  dispatch({ type: actions.USER_LOGIN_REQUESTED });

  try {
    const { data } = await http.post('/login', payload);
    dispatch({
      type: actions.USER_LOGIN_SUCCEEDED,
      payload: data.data,
    });

    const { token } = data;
    const user = {
      id: data.data.id,
      name: data.data.first_name,
      email: data.data.email,
    };

    auth.saveUserAndAuthToken(user, token);
  } catch (error) {
    dispatch({
      type: actions.USER_LOGIN_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const resetLoginUser = () => async (dispatch) => {
  dispatch({ type: actions.USER_LOGIN_RESET });
};

const getUserDetails = () => async (dispatch) => {
  dispatch({ type: actions.USER_DETAILS_REQUESTED });

  try {
    const { data: { data } } = await http.get('/me');
    dispatch({
      type: actions.USER_DETAILS_SUCCEEDED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actions.USER_DETAILS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const updateUserDetails = (payload) => async (dispatch) => {
  dispatch({ type: actions.USER_UPDATE_REQUESTED });

  try {
    const { data: { data } } = await http.put('/me', payload);
    dispatch({
      type: actions.USER_UPDATE_SUCCEEDED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actions.USER_UPDATE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const resetUpdateUserDetails = () => async (dispatch) => {
  dispatch({ type: actions.USER_UPDATE_RESET });
};

export default {
  registerUser,
  resetRegisterUser,
  loginUser,
  resetLoginUser,
  getUserDetails,
  updateUserDetails,
  resetUpdateUserDetails,
};
