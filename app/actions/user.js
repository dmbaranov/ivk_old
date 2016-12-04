import * as con from 'app/constants/user';

export function saveUser(userInfo) {
  return dispatch => {
    dispatch({
      type: con.SAVE_USER_INFO,
      payload: {userInfo}
    });
  };
}
