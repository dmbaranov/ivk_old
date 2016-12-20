import * as con from 'app/constants/dialogs';

const initialState = {
  dialogsList: [],
  dialog: [],
  dialogId: null,
  isPending: false
};

export default function auth(state=initialState, action) {
  switch (action.type) {
    case con.SAVE_DIALOGS_LIST:
      return { ...state, dialogsList: action.payload.dialogsList };

    case con.SAVE_DIALOG:
      return {
        ...state,
        dialog: [...state.dialog, ...action.payload.dialog.reverse()],
        dialogId: action.payload.dialogId
      };

    case con.TOGGLE_PENDING:
      return { ...state, isPending: !state.isPending };

    case con.ADD_MESSAGE_TO_DIALOG:
      return {
        ...state,
        dialog: [...state.dialog, action.payload.message]
      };

    case con.CLEAR_DIALOG:
      return initialState;

    default:
      return state;
  }
}
