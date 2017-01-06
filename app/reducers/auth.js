import * as con from 'app/constants/auth';

const initialState = {
  isLoggedIn: false,
  access_token: ''
};

export default function auth(state=initialState, action) {
  switch (action.type) {
    case con.AUTH_USER:
      return {
        access_token: action.payload.access_token,
        isLoggedIn: true
      };

    case con.LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
}
