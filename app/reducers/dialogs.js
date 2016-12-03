import * as con from 'app/constants/dialogs';

const initialState = {
  dialogsList: []
};

export default function auth(state=initialState, action) {
  switch (action.type) {
    case con.SAVE_DIALOGS_LIST:
      return { ...state, dialogsList: action.payload.dialogsList };

    default:
      return state;
  }
}
