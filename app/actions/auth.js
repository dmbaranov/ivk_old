import * as con from 'app/constants/auth';
import API from 'app/utils/API';

/**
 * @typedef   {Object}  authUserPayload
 * @property  {String}  access_token    - Token for the vk.com API
 * @property  {Number}  uid             - ID of the current user (who is logged in)
 */

/**
 * We save token to the localStorage, so user shouldn't login again next time.
 * After that we save token to the store
 * @param     {String}          access_token    - Token for the vk.com API
 * @param     {Number}          uid             - ID of the current user (who is logged in)
 * @return    {Object}          reducerObject   - Object for the reducer
 * @property  {String}          type            - Action type
 * @property  {authUserPayload} payload         - Payload
 */
export function authUser(access_token, uid) {
  window.localStorage.setItem('access_token', access_token);
  return {
    type: con.AUTH_USER,
    payload: { access_token, uid }
  };
}

/**
 * If we have a token in localStorage,
 * then we can authenticate user with this token.
 * Otherwise user will have to login.
 *
 * @return {Function} - Function for the reducer
 */
export function initAuth() {
  const access_token = window.localStorage.getItem('access_token');

  return async dispatch => {
    if (access_token) {
      const currentUser = await API.getCurrentUser(API.GET_REQUEST, access_token);
      dispatch(authUser(access_token, currentUser[0].uid));
    }
  };
}
