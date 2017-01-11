import * as con from 'app/constants/messages';

const initialState = {
  messages: [],
  dialogID: null
};

export default function messages(state=initialState, action) {
  switch (action.type) {
    case con.SAVE_MESSAGES:
      return { ...state, messages: [...state.messages, ...action.payload.messages] };

    case con.SAVE_INITIAL_MESSAGES:
      return { ...state, messages: action.payload.messages };

    case con.SAVE_DIALOG_ID:
      return { ...state, dialogID: action.payload.dialogID };

    default:
      return state;
  }
}
