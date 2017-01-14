import * as commonCon from 'app/constants/common';
import {getMessage} from 'app/actions/messages';
import {sendLongPollRequest} from 'app/actions/common';

const TEMP_ARRAY = [];
const TEMP_LPTS = [];

export const longPollMiddleware = store => next => action => {
  if (action.type === commonCon.UPDATE_LP_TS) {
    const {updates} = action.payload;
    const {access_token, uid} = store.getState().auth;
    const {dialogID} = store.getState().messages;
    const {lpServer, lpKey, lpTs} = store.getState().common;

    updates.map(item => {
      if (item[0] === 4 && TEMP_ARRAY.indexOf(item[1]) === -1) {

        let authorID = '';
        const messageID = item[1];

        if (item[2] === 3) {
          authorID = uid;
        }
        else if(item[2] === 17) {
          authorID = item[3];

          new Notification('New message', {
            body: 'You have a new message'
          });
        }
        TEMP_ARRAY.push(item[1]);
        store.dispatch(getMessage(access_token, messageID, authorID, dialogID));
      }
    });

    if (TEMP_LPTS.indexOf(action.payload.requestNumber) === -1) {
      store.dispatch(sendLongPollRequest(lpServer, lpKey, lpTs));
      TEMP_LPTS.push(action.payload.requestNumber);
    }
  }
  return next(action);
};
