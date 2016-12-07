import React, {Component} from 'react';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LoginContainer from 'app/containers/LoginContainer';
import MenuContainer from 'app/containers/MenuContainer';

import {initAuth, authUser} from 'app/actions/auth';
import { CLIENT_ID } from 'app/secret';
import styles from './App.scss';

// Hack for React Material UI
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

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
        <div className={styles.mainContainer}>
          <div className={styles.menu}>
            <MenuContainer/>
          </div>
          <div className={styles.content}>
            {this.props.children}
          </div>
        </div>
      )
    }
    else {
      return (
        <div className={styles.loginContainer}>
          <LoginContainer/>
        </div>
      )
    }
  };

  render() {
    return (
      <MuiThemeProvider>
        {this.getMainScreen()}
      </MuiThemeProvider>
    )
  };
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(App);
