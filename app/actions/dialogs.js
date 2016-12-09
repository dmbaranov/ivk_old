import * as con from 'app/constants/dialogs';
import API from 'app/utils/API';

export function getDialogsList(access_token) {
  return dispatch => {
    const messages = [];
    const requiredFields = 'photo';

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
          });
      });
  }
}

export function getDialog(access_token, userID) {
  return dispatch => {
    const messages = [];
    const requiredFields = 'photo';
    let userIds = null;

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
            const dialog = makeDialog(messages, users);
            dispatch(saveDialog(dialog));
          });
      });
  }
}

function makeDialogsList(messages, users) {
  return messages.map((item, index) => {
    let title = '', body = '', uid = '', type = '', photo = '';

    // if current dialog is conversation
    if (item.chat_id) {
      uid = item.chat_id;
      title = item.title;
      type = 'conversation';
    }
    // if it's a dialog with a single user
    else {
      uid = users[index].uid;
      photo = users[index].photo;
      title = `${users[index].first_name} ${users[index].last_name}`;
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

function makeDialog(messages, users) {
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

function saveDialog(dialog) {
  return {
    type: con.SAVE_DIALOG,
    payload: {dialog}
  }
}
