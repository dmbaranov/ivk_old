import React, {Component, PropTypes} from 'react';

import {CLIENT_ID} from 'app/secret';
import styles from './styles.scss';

export default class LoginComponent extends Component {
  constructor() {
    super();

    this.state = {
      loginCode: ''
    };
  }

  handleLogin = () => {
    fetch(`https://oauth.vk.com/authorize?client_id=${CLIENT_ID}&redirect_uri=blank.html&scope=notify,friends,photos,audio,video,pages,status,notes,messages,wall,ads,offline,docs,groups,notifications,email,market&response_type=token&v=5.60&state=123456`)
      .then(response => response.text())
      .then(data => {
        this.setState({
          loginCode: data
        });
      });
  };

  render() {
    return (
      <div className={styles.loginComponent}>
        <button className="btn btn-primary" onClick={this.handleLogin}>Войти</button>
        <div dangerouslySetInnerHTML={{__html: this.state.loginCode}}></div>
      </div>
    )
  }
}
