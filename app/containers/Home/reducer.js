import * as con from './constants';

const initialState = {
  name: 'Unknown soldier'
};

export default function home(state=initialState, action) {
  switch (action.type) {
    case con.CHANGE_NAME:
      return { ...state, name: action.payload.value };
    default:
      return state;
  }
}
