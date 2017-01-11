import * as con from 'app/constants/profile';
import API from 'app/utils/API';

function saveProfileData(data) {
  /**
   * @param data - profile data
   * @return object for the reducer
   *
   * Puts user information into store.
   */
  return {
    type: con.SAVE_PROFILE_DATA,
    payload: {
      first_name: data.first_name,
      last_name: data.last_name,
      country: data.country.title,
      city: data.city.title,
      status: data.status
    }
  };
}

export function getProfileData(access_token) {
  /**
   * @param access_token - token for the vk.com API
   * @return dispatch - function for the reducer
   *
   * Get information about current user and save it to the store
   */
  return async dispatch => {
    const profileData = await API.getProfileData(API.GET_REQUEST, access_token);
    dispatch(saveProfileData(profileData));
  }
}
