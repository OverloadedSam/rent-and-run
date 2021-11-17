import { userTypes as actions } from '../action-types';

const registerInitState = {
  loading: false,
  error: null,
  success: false,
  user: null,
};

export const userRegisterReducer = (state = registerInitState, action) => {
  switch (action.type) {
    case actions.USER_REGISTER_REQUESTED:
      return {
        ...registerInitState,
        loading: true,
      };
    case actions.USER_REGISTER_SUCCEEDED:
      return {
        ...state,
        loading: false,
        success: true,
        user: action.payload,
      };
    case actions.USER_REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actions.USER_REGISTER_RESET:
      return { ...registerInitState };

    default:
      return state;
  }
};

const loginInitState = {
  loading: false,
  error: null,
  success: false,
  user: null,
};

export const userLoginReducer = (state = loginInitState, action) => {
  switch (action.type) {
    case actions.USER_LOGIN_REQUESTED:
      return {
        ...loginInitState,
        loading: true,
      };
    case actions.USER_LOGIN_SUCCEEDED:
      return {
        ...state,
        loading: false,
        success: true,
        user: action.payload,
      };
    case actions.USER_LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actions.USER_LOGIN_RESET:
      return { ...loginInitState };

    default:
      return state;
  }
};

const userDetailsInitState = {
  loading: false,
  error: null,
  success: false,
  user: null,
};

export const userDetailsReducer = (state = userDetailsInitState, action) => {
  switch (action.type) {
    case actions.USER_DETAILS_REQUESTED:
      return {
        ...userDetailsInitState,
        loading: true,
      };
    case actions.USER_DETAILS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        success: true,
        user: action.payload,
      };
    case actions.USER_DETAILS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const userUpdateInitState = {
  loading: false,
  error: null,
  success: false,
  userUpdatedData: null,
};

export const userUpdateReducer = (state = userUpdateInitState, action) => {
  switch (action.type) {
    case actions.USER_UPDATE_REQUESTED:
      return {
        ...userUpdateInitState,
        loading: true,
      };
    case actions.USER_UPDATE_SUCCEEDED:
      return {
        ...state,
        loading: false,
        success: true,
        userUpdatedData: action.payload,
      };
    case actions.USER_UPDATE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actions.USER_UPDATE_RESET:
      return { ...userUpdateInitState };

    default:
      return state;
  }
};

export default {
  userRegisterReducer,
  userLoginReducer,
  userDetailsReducer,
  userUpdateReducer,
};
