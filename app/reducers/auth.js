import * as con from 'app/constants/auth';

const initialState = {
  isLoggedIn: false,
  access_token: null
};

export default function auth(state=initialState, action) {
  switch (action.type) {
    case con.AUTH_USER:
      return { ...state, access_token: action.payload.access_token, isLoggedIn: true };

    case con.LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
}
