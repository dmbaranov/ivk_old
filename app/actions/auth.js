import * as con from 'app/constants/auth';

export function authUser(access_token) {
  return {
    type: con.AUTH_USER,
    payload: {
      access_token: access_token
    }
  };
}

export function initAuth() {
  return dispatch => {
    const access_token = window.localStorage.getItem('access_token');

    if (access_token) {
      return dispatch(authUser(access_token));
    }
    return null;
  }
}
