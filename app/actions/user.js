import * as con from 'app/constants/user';
import API from 'app/utils/API';

function saveUser(userInfo) {
  return {
    type: con.SAVE_USER_INFO,
    payload: {userInfo}
  };
}

export function getUserData(access_token) {
  return dispatch => {
    API.getProfileInfo(API.GET_REQUEST, access_token)
      .then(data => {
        dispatch(saveUser(data));
      });
  }
}
