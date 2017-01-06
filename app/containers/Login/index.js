import React, {Component} from 'react';

import {CLIENT_ID} from 'app/secret';
import LoginComponent from 'app/components/Login';

const VK_AUTH_URL = `https://oauth.vk.com/authorize?client_id=${CLIENT_ID}&display=page&redirect_uri=blank.html&response_type=token&scope=139443359&v=5.60`;

export class LoginContainer extends Component {
  render() {
    return (
      <div>
        <LoginComponent authUrl={VK_AUTH_URL}/>
      </div>
    )
  };
}

export default LoginContainer;
