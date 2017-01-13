import * as con from 'app/constants/common';
import API from 'app/utils/API';

function saveLongPollServer(lpData) {
  return {
    type: con.SAVE_LP_DATA,
    payload: {
      lpKey: lpData.key,
      lpServer: lpData.server,
      lpTs: lpData.ts,
      isFetching: true,
    }
  };
}

function updateLpTs(data) {
  return {
    type: con.UPDATE_LP_TS,
    payload: {
      lpTs: data.ts,
      updates: data.updates,
      isFetching: true
    }
  }
}

export function initCommon(access_token) {
  return async dispatch => {
    const lpData = await API.getLongPollServer(API.GET_REQUEST, access_token);

    dispatch(saveLongPollServer(lpData));
  }
}

export function sendLongPollRequest(server, key, ts) {
  return async dispatch => {
    const response = await API.getLongPollHistory(API.GET_REQUEST, server, key, ts);

    dispatch(updateLpTs(response.data));
  }
}
