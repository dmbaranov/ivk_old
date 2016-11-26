import * as con from './constants';

const initialState = {
  isLoggedIn: false,
  access_token: ''
};

export default function globalState(state=initialState, action) {
  switch (action.type) {
    case con.LOGIN_SUCCESSFUL:
      return { ...state, access_token: action.payload.access_token, isLoggedIn: true };

    case con.LOGOUT_SUCCESSFUL:
      return { ...state, access_token: '', isLoggedIn: false };

    default:
      return state;
  }
}
