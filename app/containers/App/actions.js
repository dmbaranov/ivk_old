import API from 'app/utils/API';
import * as con from './constants';
import { CLIENT_ID } from 'app/secret';

export function handleLoginHelper(client_id) {
  return API.loginRequest({
    method: 'GET'
  }, client_id);
}

export function handleLoginSuccess(dispatch, data) {
  dispatch({
    type: con.LOGIN_SUCCESSFUL,
    payload: {
      access_token: data.access_token
    }
  });
}

export function handleLogin() {
  return dispatch => {
    handleLoginHelper(CLIENT_ID).then(response => {
      console.log(response);
    });
  }
}
