import * as con from './constants';

export function changeName(dispatch) {
  return dispatch => {
    dispatch({
      type: con.CHANGE_NAME,
      payload: {
        value: 'Some new name lol'
      }
    });
  }
}
