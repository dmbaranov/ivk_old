import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MenuContainer from 'app/containers/Menu';
import LoginContainer from 'app/containers/Login';

import * as actions from 'app/actions/auth';
import styles from './style.scss';

export class App extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      isLoggedIn: PropTypes.bool.isRequired,
      access_token: PropTypes.string.isRequired
    }),
    actions: PropTypes.object.isRequired
  };

  constructor() {
    super();

    // For the material-ui
    injectTapEventPlugin();
  }

  componentWillMount() {
    const {initAuth, authUser} = this.props.actions;
    ipcRenderer.on('get_access_token', (event, data) => {
      authUser(data.access_token);
    });

    initAuth();
  }

  getMainScreen() {
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
  }

  render() {
    return (
      <MuiThemeProvider>
        {this.getMainScreen()}
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
