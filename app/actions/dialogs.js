import * as con from 'app/constants/dialogs';
import API from 'app/utils/API';

function saveDialogsList(dialogs, users) {
  return {
    type: con.SAVE_DIALOGS_LIST,
    payload: {dialogs, users}
  };
}

export function getDialogsList(access_token) {
  return async dispatch => {
    const rawDialogs = await API.getDialogsList(API.GET_REQUEST, access_token);
    rawDialogs.splice(0, 1);



    const users = await getUsers(access_token, rawDialogs);
    const dialogs = constructDialogs(rawDialogs, users);

    dispatch(saveDialogsList(dialogs, users));
  }
}

async function getUsers(access_token, dialogs) {
  const resultUsers = {}, usersBuffer = [];

  Promise.all(dialogs.map(async item => {
    if (item.chat_id) {
      const dialogUsers = await API.getDialogUsers(API.GET_REQUEST, access_token, item.chat_id, 'photo_50');

      dialogUsers[0].map(user => {
        resultUsers[user.uid] = user;
      });
    }
    else {
      usersBuffer.push(item.uid);
    }
  }));

  // Because stupid API of vk.com doesn't return info about last user, we have to add last user one more time lol
  usersBuffer.push(usersBuffer[length - 1]);

  const singleUsers = await API.getUserInfo(API.GET_REQUEST, access_token, usersBuffer.join(','), 'photo_50');
  singleUsers.map(user => {
    resultUsers[user.uid] = user;
  });

  return resultUsers;
}

function constructDialogs(data, users) {
  const result = [];

  data.map(item => {
    if (item.chat_id) {
      result.push({
        type: 'chat',
        title: item.title,
        body: item.body,
      });
    }
    else {
      const user = users[item.uid];
      const title = user.first_name + ' ' + user.last_name;
      result.push({
        type: 'single',
        title: title,
        body: item.body,
        avatar: user.photo_50
      });
    }
  });

  return result;
}
