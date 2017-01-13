import * as commonCon from 'app/constants/common';
import {getMessage} from 'app/actions/messages';

const TEMP_ARRAY = [];

export const longPollMiddleware = store => next => action => {
  if (action.type === commonCon.UPDATE_LP_TS) {
    const {updates} = action.payload;
    const {access_token} = store.getState().auth;
    const {dialogID} = store.getState().messages;

    updates.map(item => {
      if (item[0] === 4 && TEMP_ARRAY.indexOf(item[1]) === -1) {
        // const message = {
        //   mid: item[1],
        //   uid: item[3],
        //   body: item[6]
        // };
        // const authorID = item[3];

        const messageID = item[1];
        const authorID = item[3];
        console.log('inside middleware');
        TEMP_ARRAY.push(item[1]);
        store.dispatch(getMessage(access_token, messageID, authorID, dialogID));
      }
    });
  }
  return next(action);
};
