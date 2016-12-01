import React, {Component} from 'react';

import {CLIENT_ID} from 'app/secret';
import {authUser} from 'app/actions/auth';

const vkAuthUrl = `https://oauth.vk.com/authorize?client_id=${CLIENT_ID}&display=page&redirect_uri=blank.html&response_type=token&scope=139443359&v=5.60`;

export default class Login extends Component {
  render() {
    return (
      <div>
        <a href={vkAuthUrl}>Enter</a>
      </div>
    )
  };
}