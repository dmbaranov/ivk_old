import * as con from 'app/constants/dialogs';

export function saveDialogsList(dialogsList) {
  return dispatch => {
    dispatch({
      type: con.SAVE_DIALOGS_LIST,
      payload: {
        dialogsList: dialogsList
      }
    });
  };
}
