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
      console.log('Error has occured while processing a request!');
      console.log(error);
      reject(error);
    });
}

export default {
  getProfileData(params, access_token) {
    return new Promise((resolve, reject) => {
      request(`https://api.vk.com/method/account.getProfileInfo?access_token=${access_token}`, params, resolve, reject);
    });
  },

  getCurrentUser(params, access_token) {
    return new Promise((resolve, reject) => {
      request(`https://api.vk.com/method/users.get?access_token=${access_token}`, params, resolve, reject);
    });
  },

  getDialogsList(params, access_token) {
    return new Promise((resolve, reject) => {
      request(`https://api.vk.com/method/messages.getDialogs?access_token=${access_token}`, params, resolve, reject);
    });
  },

  getDialogUsers(params, access_token, chat_ids, fields) {
    return new Promise((resolve, reject) => {
      request(`https://api.vk.com/method/messages.getChatUsers?access_token=${access_token}&chat_ids=${chat_ids}&fields=${fields}&v=5.62`, params, resolve, reject);
    });
  },

  getUserInfo(params, access_token, user_ids, fields='') {
    return new Promise((resolve, reject) => {
      request(`https://api.vk.com/method/users.get?access_token=${access_token}&user_ids=${user_ids}&fields=${fields}`, params, resolve, reject);
    });
  },

  getDialogHistory(params, access_token, user_id) {
    return new Promise((resolve, reject) => {
      request(`https://api.vk.com/method/messages.getHistory?access_token=${access_token}&user_id=${user_id}`, params, resolve, reject);
    });
  },

  sendMessage(params, access_token, message, dialog_id, random_id) {
    return new Promise((resolve, reject) => {
      request(`https://api.vk.com/method/messages.send?peer_id=${dialog_id}&message=${message}&random_id=${random_id}&access_token=${access_token}&v=5.60`, params, resolve, reject);
    });
  },

  getMessageInfo(params, access_token, message_id) {
    return new Promise((resolve, reject) => {
      request(`https://api.vk.com/method/messages.getById?access_token=${access_token}&message_ids=${message_id}`, params, resolve, reject);
    });
  }
}
