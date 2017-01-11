import {push} from 'react-router-redux';

import * as con from 'app/constants/dialogs';
import API from 'app/utils/API';

export function redirectTo(location) {
  /**
   * @param location - url, where to redirect
   * @return dispatch - function for the reducer
   *
   * Simply redirects user.
   */
  return dispatch => {
    dispatch(push(location));
  }
}

function saveDialogsList(dialogs, users) {
  /**
   * @param dialogs - list of dialogs
   * @param users - list of all users (both from single conversations and chats)
   * @return object for the reducer
   *
   * Puts list of dialogs and users into store
   */
  return {
    type: con.SAVE_DIALOGS_LIST,
    payload: { dialogs, users }
  };
}

export function getDialogsList(access_token) {
  /**
   * @param access_token - token for the vk.com API
   * @return dispatch - function for the reducer
   *
   * Creating list of users, list of dialogs and saves it into store.
   */
  return async dispatch => {
    const rawDialogs = await API.getDialogsList(API.GET_REQUEST, access_token);
    rawDialogs.splice(0, 1); // because the first element is a length of response

    const users = await getUsers(access_token, rawDialogs);
    const dialogs = constructDialogs(rawDialogs, users);

    dispatch(saveDialogsList(dialogs, users));
  }
}

async function getUsers(access_token, dialogs) {
  /**
   * @param access_token - token for the vk.com API
   * @param dialogs - list of raw dialogs
   * @return resultUsers - object of users
   *
   * Collects user ids from every dialog (both single and chat),
   * fetch information for every id (first name, last name, etc)
   * and creates an object where
   * every key is a user id and every value is an information about user.
   * So we can easily get data about user while creating dialogs.
   *
   */
  const resultUsers = {},
        usersBuffer = [], // contains info about single users
        chatsBuffer = [], // contains chat's ids
        chatUsers   = []; // contains info about chat users

  Promise.all(dialogs.map(async item => {
    if (item.chat_id) {
      // If this is a chat
      chatsBuffer.push(item.chat_id);
    }
    else {
      // If this is a dialog with a single person
      usersBuffer.push(item.uid);
    }
  }));

  // Because stupid API of vk.com doesn't return info about last user, we have to add last user one more time lol
  // usersBuffer.push(usersBuffer[length - 1]);

  const singleUsers = await API.getUserInfo(API.GET_REQUEST, access_token, usersBuffer.join(','), 'photo_50');
  const rawChatsUsers = await API.getDialogUsers(API.GET_REQUEST, access_token, chatsBuffer.join(','), 'photo_50');

  for (const key in rawChatsUsers) {
    chatUsers.push(...rawChatsUsers[key]);
  }

  chatUsers.map(user => {
    resultUsers[user.id] = user;
  });

  singleUsers.map(user => {
    resultUsers[user.uid] = user;
  });

  return resultUsers;
}

function constructDialogs(dialogs, users) {
  /**
   * @param dialogs - list of dialogs
   * @param users - list of users
   * @return result - list of dialogs with title, body, avatars, etc...
   *
   * Here we create actual list of dialogs. We take every dialog,
   * and if it's a chat we can take chat's title,
   * but if it's a single, then our title will be equal to
   * the first name and the last name of the person.
   * That's why we need that users object.
   *
   */
  const result = [];

  dialogs.map(item => {
    if (item.chat_id) {
      result.push({
        type: 'chat',
        title: item.title,
        body: item.body,
        id: item.chat_id
      });
    }
    else {
      const user = users[item.uid];
      const title = user.first_name + ' ' + user.last_name;
      result.push({
        type: 'single',
        title: title,
        body: item.body,
        id: item.uid,
        avatar: user.photo_50
      });
    }
  });

  return result;
}
