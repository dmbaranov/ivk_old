import * as con from './constants';

export function handleLogin(access_token) {
  return dispatch => {
    dispatch({
      type: con.LOGIN_SUCCESSFUL,
      payload: {
        access_token: access_token
      }
    });

    window.localStorage.setItem('access_token', access_token);
  }
}
