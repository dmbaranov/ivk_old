function request(url, params, resolve, reject) {
  fetch(url, params)
    .then(response => response.json());
  // fetch(url, params)
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data);
  //     if (response.ok) {
  //       resolve(data);
  //     }
  //     else {
  //       reject(data);
  //     }
  //   });
}

export default {
  loginRequest(params, client_id) {
    return new Promise((resolve, reject) => {
      request(`https://oauth.vk.com/authorize?client_id=${client_id}&redirect_uri=blank.html&scope=notify,friends,photos,audio,video,pages,status,notes,messages,wall,ads,offline,docs,groups,notifications,email,market&response_type=token&v=5.60&state=123456`, params, resolve, reject);
    });
  }
}
