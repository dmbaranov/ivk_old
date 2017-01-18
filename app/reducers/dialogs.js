import * as con from 'app/constants/dialogs';

const initialState = {
  dialogs: new Map,
  users: []
};

export default function dialogs(state=initialState, action) {
  switch (action.type) {
    case con.SAVE_DIALOGS_LIST:
      return { ...state, dialogs: action.payload.dialogs, users: action.payload.users };

    case con.UPDATE_DIALOGS_LIST:
      return { ...state, dialogs: action.payload.dialogs };

    default:
      return state;
  }
}
