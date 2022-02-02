import { USER_TYPE_ADMIN } from './constants';

export function setAuth(authData) {
  if (authData) {
    localStorage.setItem('auth', JSON.stringify(authData));
  } else {
    localStorage.removeItem('auth');
  }
}

export function getAuth() {
  try {
    return JSON.parse(localStorage.getItem('auth'));
  } catch (error) {
    // nothing
  }

  return null;
}

export function isAdminUser() {
  const authData = getAuth();
  return !!(authData && authData.me.type === USER_TYPE_ADMIN);
}

export default {
  getAuth,
  setAuth,
};
