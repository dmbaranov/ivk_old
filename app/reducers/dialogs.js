import * as con from 'app/constants/dialogs';

const initialState = {
  dialogsList: [],
  dialog: []
};

export default function auth(state=initialState, action) {
  switch (action.type) {
    case con.SAVE_DIALOGS_LIST:
      return { ...state, dialogsList: action.payload.dialogsList };

    case con.SAVE_DIALOG:
      return { ...state, dialog: action.payload.dialog.reverse() };

    default:
      return state;
  }
}
