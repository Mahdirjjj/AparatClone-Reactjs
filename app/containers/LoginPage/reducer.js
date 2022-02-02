/* eslint-disable indent */
/*
 *
 * LoginPage reducer
 *
 */
import { LOGOUT_ACTION_SUCCESS } from 'containers/App/constants';
import produce from 'immer';
import {
  LOGIN_ACTION,
  LOGIN_FAIL_ACTION,
  LOGIN_REINIT,
  LOGIN_SUCCESS_ACTION,
  REGISTER_USER_ACTION,
  REGISTER_USER_FAIL_ACTION,
  REGISTER_USER_REINIT,
  REGISTER_USER_SUCCESS_ACTION,
  REGISTER_USER_VERIFY_ACTION,
  REGISTER_USER_VERIFY_SUCCESS_ACTION,
  REGISTER_USER_VERIFY_FAIL_ACTION,
} from './constants';

export const initialState = {
  login: {
    username: null,
    password: null,
    firstTime: false,
    user: null,
    error: null,
  },
  registerUser: {
    params: null,
    data: null,
    error: null,
  },
  registerUserVerify: {
    params: null,
    data: null,
    error: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      // #region login
      case LOGIN_REINIT:
        draft.login.error = null;
        draft.login.user = null;
        draft.login.firstTime = false;
        break;
      case LOGIN_ACTION:
        draft.login.username = action.username;
        draft.login.password = action.password;
        draft.login.firstTime = action.firstTime;
        draft.login.error = null;
        draft.login.user = null;
        break;
      case LOGIN_SUCCESS_ACTION:
        draft.login.user = action.user;
        draft.login.username = null;
        draft.login.password = null;
        draft.login.firstTime = false;
        draft.login.error = null;
        break;
      case LOGIN_FAIL_ACTION:
        draft.login.error = action.error;
        draft.login.user = null;
        draft.login.password = null;
        draft.login.username = null;
        break;
      // #endregion login

      // #region logout
      case LOGOUT_ACTION_SUCCESS:
        Object.keys(initialState).forEach(key => {
          draft[key] = initialState[key];
        });
        break;
      // #endregion logout

      // #region register user
      case REGISTER_USER_REINIT:
        draft.registerUser.params = null;
        draft.registerUser.data = null;
        draft.registerUser.error = null;
        break;
      case REGISTER_USER_ACTION:
        draft.registerUser.params = action.params;
        break;
      case REGISTER_USER_SUCCESS_ACTION:
        draft.registerUser.params = null;
        draft.registerUser.data = action.data;
        break;
      case REGISTER_USER_FAIL_ACTION:
        draft.registerUser.params = null;
        draft.registerUser.error = action.error;
        break;
      // #endregion register user

      // #region register user verify
      case REGISTER_USER_VERIFY_ACTION:
        draft.registerUserVerify.params = action.params;
        break;
      case REGISTER_USER_VERIFY_SUCCESS_ACTION:
        draft.registerUserVerify.params = null;
        draft.registerUserVerify.data = action.data;
        break;
      case REGISTER_USER_VERIFY_FAIL_ACTION:
        draft.registerUserVerify.params = null;
        draft.registerUserVerify.error = action.error;
        break;
      // #endregion register user verify
    }
  });

export default loginPageReducer;
