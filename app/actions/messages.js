import {push} from 'react-router-redux';

import API from 'app/utils/API';
import * as con from 'app/constants/messages';

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

function saveInitialMessages(messages) {
  /**
   * @param messages - list of messages
   * @return object for the reducer
   *
   * Adds list of messages (when page was loaded) into store
   */
  return {
    type: con.SAVE_INITIAL_MESSAGES,
    payload: { messages }
  };
}

function saveMessages(messages) {
  /**
   * @param messages - list of messages
   * @return object for the reducer
   *
   * Adds list of messages (usually one message that was sent) into store
   */
  return {
    type: con.SAVE_MESSAGES,
    payload: { messages }
  }
}

function putDialogId(dialogID) {
  /**
   * @param dialogID - id of the current dialog
   * @return object for the reducer
   *
   * Puts id of the current dialog into store
   */
  return {
    type: con.SAVE_DIALOG_ID,
    payload: { dialogID }
  }
}

export function initMessages(access_token, dialogID, users) {
  /**
   * @param access_token - token for the vk.com API
   * @param dialogID - id of the dialog for which we need to get messages
   * @return dispatch - function for the reducer
   *
   * Receive list of messages for the required dialog
   */
  return async dispatch => {
    const rawMessages = await API.getDialogHistory(API.GET_REQUEST, access_token, dialogID);
    rawMessages.splice(0, 1); // because first element is a length of the array
    rawMessages.reverse(); // correct order of the messages

    const messages = constructMessages(rawMessages, users);
    dispatch(saveInitialMessages(messages));
  }
}

export function addMessage(access_token, message, dialogID, users) {
  /**
   * @param access_token - token for the vk.com API
   * @param message - message text
   * @param dialogID - id of the active dialog
   * @param users - list of users to construct message
   *
   * First we receive message id,
   * after that we receive info about this message (id, body, etc...),
   * construct this message and save into store.
   */
  return async dispatch => {
    const randomNumber = Math.floor(Math.random() * 100000 + 1);
    const messageID = await API.sendMessage(API.GET_REQUEST, access_token, message, dialogID, randomNumber);
    const rawMessage = await API.getMessageInfo(API.GET_REQUEST, access_token, messageID);
    rawMessage.splice(0, 1);

    const resultMessage = constructMessages(rawMessage, users);
    dispatch(saveMessages(resultMessage));
  }
}

export function saveDialogId(id) {
  return dispatch => {
    dispatch(putDialogId(id));
  }
}

function constructMessages(rawMessages, users) {
  /**
   * @param messages - list of raw messages
   * @param users - list of users (names, avatars, etc...)
   * @return list of constructed messages
   *
   * Creates list of messages for rendering in component
   */
  return rawMessages.map(item => {
    const user = users[item.uid];

    return {
      id: item.mid,
      title: user.first_name + ' ' + user.last_name,
      body: item.body,
      avatar: user.photo_50
    };
  });
}
