import * as con from 'app/constants/profile';
import API from 'app/utils/API';

/**
 * Puts user information into store.
 * @param   {object}  data - profile data
 * @return  {object}  object for the reducer
 */
function saveProfileData(data) {
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

/**
 * Get information about current user and save it to the store
 * @param {string}        access_token  - token for the vk.com API
 // * @return {function(*)}  dispatch      - function for the reducer
 */
export function getProfileData(access_token) {
  return async dispatch => {
    const profileData = await API.getProfileData(API.GET_REQUEST, access_token);
    dispatch(saveProfileData(profileData));
  }
}
