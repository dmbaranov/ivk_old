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
  }
}
