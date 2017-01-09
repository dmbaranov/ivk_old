import * as con from 'app/constants/auth';
import API from 'app/utils/API';

export function authUser(access_token, uid) {
  window.localStorage.setItem('access_token', access_token);

  return {
    type: con.AUTH_USER,
    payload: { access_token, uid }
  };
}

export function initAuth() {
  const access_token = window.localStorage.getItem('access_token');

  return async(dispatch) => {
    if (access_token) {
      try {
        const currentUser = await API.getCurrentUser(API.GET_REQUEST, access_token);

        dispatch(authUser(access_token, currentUser[0].uid));
      }
      catch(e) {
        // TODO: better errors handling
        console.log('Error occured');
        console.log(e);
      }
    }
  };
}
