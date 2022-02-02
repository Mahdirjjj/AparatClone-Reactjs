/*
 *
 * LoginPage actions
 *
 */

import {
  LOGIN_ACTION,
  LOGIN_SUCCESS_ACTION,
  LOGIN_FAIL_ACTION,
  LOGIN_REINIT,
  REGISTER_USER_SUCCESS_ACTION,
  REGISTER_USER_FAIL_ACTION,
  REGISTER_USER_REINIT,
  REGISTER_USER_ACTION,
  REGISTER_USER_VERIFY_ACTION,
  REGISTER_USER_VERIFY_SUCCESS_ACTION,
  REGISTER_USER_VERIFY_FAIL_ACTION,
} from './constants';

export function loginAction(username, password, firstTime) {
  return {
    type: LOGIN_ACTION,
    username,
    password,
    firstTime,
  };
}
export function loginSuccessAction(user) {
  return {
    type: LOGIN_SUCCESS_ACTION,
    user,
  };
}
export function loginFailAction(error) {
  return {
    type: LOGIN_FAIL_ACTION,
    error,
  };
}
export function loginReinitAction() {
  return {
    type: LOGIN_REINIT,
  };
}

export function registerUserAction(params) {
  return {
    type: REGISTER_USER_ACTION,
    params,
  };
}
export function registerUserSuccessAction(data) {
  return {
    type: REGISTER_USER_SUCCESS_ACTION,
    data,
  };
}
export function registerUserFailAction(error) {
  return {
    type: REGISTER_USER_FAIL_ACTION,
    error,
  };
}
export function registerUserReinitAction() {
  return {
    type: REGISTER_USER_REINIT,
  };
}

export function registerUserVerifyAction(params) {
  return {
    type: REGISTER_USER_VERIFY_ACTION,
    params,
  };
}
export function registerUserVerifySuccessAction(data) {
  return {
    type: REGISTER_USER_VERIFY_SUCCESS_ACTION,
    data,
  };
}
export function registerUserVerifyFailAction(error) {
  return {
    type: REGISTER_USER_VERIFY_FAIL_ACTION,
    error,
  };
}
