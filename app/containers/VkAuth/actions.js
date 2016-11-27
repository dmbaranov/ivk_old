import {hashHistory} from 'react-router';

import * as con from 'app/containers/App/constants';

export function handleLogin(access_token) {
  return dispatch => {
    dispatch({
      type: con.LOGIN_SUCCESSFUL,
      payload: {
        access_token: access_token
      }
    });

    hashHistory.push('/');
  };
}
