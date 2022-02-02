import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectLoginPageDomain = state => state.loginPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoginPage
 */

export const makeSelectLogin = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate.login,
  );

export const makeSelectRegisterUser = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate.registerUser,
  );

export const makeSelectRegisterUserVerify = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate.registerUserVerify,
  );

export { selectLoginPageDomain };
