import {push} from 'react-router-redux';

import API from 'app/utils/API';
import * as con from 'app/constants/messages';

/**
 * Simply redirects user.
 * @param   {string}    location - url, where to redirect
 * @return  {Function}  dispatch - function for the reducer
 */
export function redirectTo(location) {
  return dispatch => {
    dispatch(push(location));
  }
}

/**
 * Adds list of messages (when page was loaded) into store
 * @param   {Array}   messages - list of messages
 * @return  {object}  object for the reducer
 */
function saveInitialMessages(messages) {
  return {
    type: con.SAVE_INITIAL_MESSAGES,
    payload: { messages }
  };
}

/**
 * Adds list of messages (usually one message that was sent) into store
 * @param   {Array}   messages - list of messages
 * @return  {object}  object for the reducer
 */
function saveMessages(messages) {
  return {
    type: con.SAVE_MESSAGES,
    payload: { messages }
  }
}

/**
 * Puts id of the current dialog into store
 * @param   {number}  dialogID - id of the current dialog
 * @return  {object}  object for the reducer
 */
function putDialogId(dialogID) {
  return {
    type: con.SAVE_DIALOG_ID,
    payload: { dialogID }
  }
}

/**
 * Receive list of messages for the required dialog
 * @param   {string}  access_token - token for the vk.com API
 * @param   {number}  dialogID - id of the dialog for which we need to get messages
 * @return  {Array}   dispatch - function for the reducer
 */
export function initMessages(access_token, dialogID, users) {
  return async dispatch => {
    const rawMessages = await API.getDialogHistory(API.GET_REQUEST, access_token, dialogID);
    rawMessages.splice(0, 1); // because first element is a length of the array
    rawMessages.reverse(); // correct order of the messages

    const messages = constructMessages(rawMessages, users);
    dispatch(saveInitialMessages(messages));
  }
}

/**
 * First we receive message id,
 * after that we receive info about this message (id, body, etc...),
 * construct this message and save into store.
 * @param {string}  access_token  - token for the vk.com API
 * @param {string}  message       - message text
 * @param {number}  dialogID      - id of the active dialog
 * @param {Array}   user          - list of users to construct message
 */
export function addMessage(access_token, message, dialogID, user) {
  return async dispatch => {
    const randomNumber = Math.floor(Math.random() * 100000 + 1);
    const messageID = await API.sendMessage(API.GET_REQUEST, access_token, message, dialogID, randomNumber);
    const rawMessage = await API.getMessageInfo(API.GET_REQUEST, access_token, messageID);
    rawMessage.splice(0, 1);

    // Because of stupid API of the vk, we have to fixed uid,
    // otherwise it will be equal to the receiver's uid.
    const fixedMessage = {
      ...rawMessage[0],
      uid: rawMessage[0].uid = user.uid
    };

    const fixedUser = {
      [user.uid]: user
    };

    const resultMessage = constructMessages([fixedMessage], fixedUser);
    // dispatch(saveMessages(resultMessage));
  }
}

export function getMessage(access_token, messageID, authorID, activeDialogID) {
  return async dispatch => {

    // Won't work for chats
    // if (authorID === parseInt(activeDialogID)) {
      const rawMessage = await API.getMessageInfo(null, access_token, messageID);
      const rawAuthor = await API.getUserInfo(null, access_token, authorID, 'photo_50');
      const author = {
        [authorID]: rawAuthor[0]
      };
      rawMessage.splice(0, 1);
      rawMessage[0].sender = authorID;

      const message = constructMessages(rawMessage, author);

      dispatch(saveMessages(message));
      // const rawAuthor = await API.getUserInfo(null, access_token, authorID, 'photo_50');
      // const author = {
      //   [authorID]: rawAuthor[0]
      // };
      //
      // const message = constructMessages([rawMessage], author);
      // console.log(message);
    };
  // }
}

/**
 *
 * @param {number} id     - id of the activeDialog
 // * @return {function(*)}  - function for the reducer
 */
export function saveDialogId(id) {
  return dispatch => {
    dispatch(putDialogId(id));
  }
}

/**
 * Creates list of messages for rendering in component
 * @param   {Array} rawMessages - list of raw messages
 * @param   {Object} users      - list of users (names, avatars, etc...)
 * @return  {Array} list of constructed messages
 */
function constructMessages(rawMessages, users) {
  return rawMessages.map(item => {
    const user = users[item.sender] || users[item.uid];

    return {
      id: item.mid,
      title: user.first_name + ' ' + user.last_name,
      body: item.body,
      avatar: user.photo_50,
      readState: item.read_state
    };
  });
}
