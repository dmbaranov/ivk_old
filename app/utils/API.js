export const GET_REQUEST = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
};

export const POST_REQUEST = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
};

function request(url, params, resolve, reject) {
  fetch(url, params)
    .then(response => response.json())
    .then(data => resolve(data.response))
    .catch(error => {
      alert('Error has occured while processing a request!');
      alert(error);
      reject(error);
    });
}

export default {
  getProfileInfo(params, access_token) {
    return new Promise((resolve, reject) => {
      request(`https://api.vk.com/method/account.getProfileInfo?access_token=${access_token}`, params, resolve, reject);
    });
  },

  getDialogsList(params, access_token) {
    return new Promise((resolve, reject) => {
      request(`https://api.vk.com/method/messages.getDialogs?access_token=${access_token}`, params, resolve, reject);
    });
  },

  getDialogInfo(params, access_token, dialogID) {
    return new Promise((resolve, reject) => {
      request(`https://api.vk.com/method/messages.getChat?chat_id=${dialogID}&access_token=${access_token}`, params, resolve, reject);
    });
  },

  getUserInfo(params, access_token, userID, fields='') {
    return new Promise((resolve, reject) => {
      request(`https://api.vk.com/method/users.get?user_ids=${userID}&fields=${fields}&access_token=${access_token}`, params, resolve, reject);
    });
  },

  getDialogHistory(params, access_token, userID) {
    return new Promise((resolve, reject) => {
      request(`https://api.vk.com/method/messages.getHistory?user_id=${userID}&access_token=${access_token}`, params, resolve, reject);
    });
  },

  sendMessage(params, access_token, message, dialogID, randomID) {
    return new Promise((resolve, reject) => {
      request(`https://api.vk.com/method/messages.send?peer_id=${dialogID}&message=${message}&random_id=${randomID}&access_token=${access_token}&v=5.60`, params, resolve, reject);
    });
  }
}
