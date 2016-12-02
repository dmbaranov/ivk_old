import * as con from 'app/constants/user';

const initialState = {
  userInfo: {}
};

export default function auth(state=initialState, action) {
  switch (action.type) {
    case con.SAVE_USER_INFO:
      return { ...state, userInfo: action.payload.userInfo };

    default:
      return state;
  }
}
