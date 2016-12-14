import _ from 'lodash';

import * as con from 'app/constants/dialogs';
import API from 'app/utils/API';

export function getDialogsList(access_token) {
  return dispatch => {
    const messages = [];
    const requiredFields = 'photo';

    dispatch(togglePending());

    API.getDialogsList(API.GET_REQUEST, access_token)
      .then(data => {
        data.map(item => {
          if (typeof item !== 'number') {
            messages.push(item);
          }
        });

        // messages.map returns list of uid
        API.getUserInfo(API.GET_REQUEST, access_token, messages.map(item => item.uid).join(','), requiredFields)
          .then(users => {
            const dialogs = makeDialogsList(messages, users);
            dispatch(saveDialogsList(dialogs));
            dispatch(togglePending());
          });
      });
  }
}

export function getMessages(access_token, userID) {
  return dispatch => {
    const messages = [];
    const requiredFields = 'photo';
    let userIds = null;

    dispatch(togglePending());

    API.getDialogHistory(API.GET_REQUEST, access_token, userID)
      .then(data => {
        data.map(item => {
          if (typeof item !== 'number') {
            messages.push(item);
          }
        });

        // it creates an array of uids and removes duplicates. simply believe me :)
        userIds = [...new Set(messages.map(item => item.uid))].join(',');

        API.getUserInfo(API.GET_REQUEST, access_token, userIds, requiredFields)
          .then(users => {
            const dialog = makeMessages(messages, users);
            const dialogId = userID;
            dispatch(saveDialog(dialog, dialogId));
            dispatch(togglePending());
          });
      });
  }
}

export function sendMessage(access_token, dialogID, message) {
  return dispatch => {
    const randomNumber = Math.floor(Math.random() * 100000 + 1);

    console.log(dialogID);

    API.sendMessage(API.GET_REQUEST, access_token, message, dialogID, randomNumber);
  };
  // const randomNumber = Math.floor(Math.random() * 100000 + 1);
  //
  // API.sendMessage(API.GET_REQUEST, access_token, message, dialogID, randomNumber)
  //   .then(response => {
  //     console.log(response);
  //   });
}

function makeDialogsList(messages, users) {

  const usersList = _.keyBy(users, 'uid');

  return messages.map(item => {
    let title = '', body = '', uid = '', type = '', photo = '';

    if (item.chat_id) {
      uid = item.chat_id;
      title = item.title;
      type = 'conversation';
    }
    else {
      uid = item.uid;
      photo = usersList[uid].photo;
      title = `${usersList[uid].first_name} ${usersList[uid].last_name}`;
      type = 'single';
    }

    if (item.attachment) {
      body = item.attachments[0].type;
    }
    else if (item.fwd_messages) {
      body = 'message';
    }
    else {
      body = item.body;
    }

    return {
      title: title,
      body: body,
      uid: uid,
      type: type,
      photo: photo
    };
  });
}

function makeMessages(messages, users) {
  const userIds = users.map(user => user.uid);
  let body = '';
  return messages.map((message, index) => {
    const currentUserNumber = userIds.indexOf(messages[index].from_id);
    if (message.attachment) {
      body = message.attachments[0].type;
    }
    else if (message.fwd_messages) {
      body = 'messages';
    }
    else {
      body = message.body;
    }
    return {
      body: body,
      user: `${users[currentUserNumber].first_name} ${users[currentUserNumber].last_name}`,
      photo: `${users[currentUserNumber].photo}`
    }
  });
}

function saveDialogsList(dialogsList) {
  return {
    type: con.SAVE_DIALOGS_LIST,
    payload: {dialogsList}
  };
}

function saveDialog(dialog, dialogId) {
  return {
    type: con.SAVE_DIALOG,
    payload: {dialog, dialogId}

  };
}

function togglePending() {
  return {
    type: con.TOGGLE_PENDING
  };
}
