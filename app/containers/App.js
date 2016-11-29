import React, {Component} from 'react';
import {connect} from 'react-redux';

import LoginContainer from 'app/containers/LoginContainer';
import MenuContainer from 'app/containers/MenuContainer';

import {initAuth, authUser} from 'app/actions/auth';
import { CLIENT_ID } from 'app/secret';

export class App extends Component {
  componentWillMount() {
    const {dispatch} = this.props;
    const {ipcRenderer} = require('electron');
    ipcRenderer.on('get_access_token', (event, data) => {
      dispatch(authUser(data.access_token));
    });

    dispatch(initAuth());
  }

  getMainScreen = () => {
    const {isLoggedIn} = this.props.auth;

    if (isLoggedIn) {
      return (
        <div>
          <div>
            <MenuContainer/>
          </div>
          <div>
            {this.props.children}
          </div>
        </div>
      )
    }
    else {
      return <LoginContainer/>
    }
  };

  render() {
    console.log('Here');
    return (
      <div>
        {this.getMainScreen()}
      </div>
    )
  };
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(App);
