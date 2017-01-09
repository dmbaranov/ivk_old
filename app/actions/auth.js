import * as con from 'app/constants/auth';
import API from 'app/utils/API';

export function authUser(access_token, uid) {
  /**
   * @param access_token - token for the vk.com API
   * @param uid - id of the current user (who is logged in)
   * @return object for the reducer
   *
   * We save token to the localStorage, so user shouldn't login again next time.
   * After that we save token to the store
   */
  window.localStorage.setItem('access_token', access_token);

  return {
    type: con.AUTH_USER,
    payload: { access_token, uid }
  };
}

export function initAuth() {
  /**
   * @return dispatch - function for the reducer
   *
   * If we have a token in localStorage,
   * then we can authenticate user with this token.
   * Otherwise user will have to login.
   */
  const access_token = window.localStorage.getItem('access_token');

  return async dispatch => {
    if (access_token) {
      const currentUser = await API.getCurrentUser(API.GET_REQUEST, access_token);
      dispatch(authUser(access_token, currentUser[0].uid));
    }
  };
}
