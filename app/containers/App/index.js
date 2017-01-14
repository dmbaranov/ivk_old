import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ipcRenderer} from 'electron';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MenuContainer from 'app/containers/Menu';
import LoginContainer from 'app/containers/Login';

import * as authActions from 'app/actions/auth';
import * as commonActions from 'app/actions/common';
import styles from './style.scss';

export class App extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      isLoggedIn: PropTypes.bool.isRequired,
      access_token: PropTypes.string.isRequired,
      uid: PropTypes.string.isRequired
    }),
    authActions: PropTypes.object.isRequired,
    commonActions: PropTypes.object.isRequired
  };

  constructor() {
    super();

    // For the material-ui
    injectTapEventPlugin();
    this.state = {
      lpStarted: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const {access_token} = nextProps.auth;
    const {lpServer, lpKey, lpTs} = nextProps.common;
    const {initCommon, sendLongPollRequest} = this.props.commonActions;
    const {lpStarted} = this.state;

    if (!lpStarted && access_token !== '') {
      initCommon(access_token);
    }

    if (!lpStarted && lpServer !== '') {
      sendLongPollRequest(lpServer, lpKey, lpTs);

      this.setState({
        lpStarted: !lpStarted
      });
    }

    // if (this.props.common.isFetching === false && lpTs !== '') {
    //   sendLongPollRequest(lpServer, lpKey, lpTs);
    // }



    // if (this.props.common.lpTs !== lpTs) {
    //   sendLongPollRequest(lpServer, lpKey, lpTs);
    // }

    // if (this.state.lpTs === '' || this.state.lpTs !== this.props.common.lpTs) {
    //   sendLongPollRequest(lpServer, lpKey, lpTs);
    //
    //   this.setState({
    //     lpTs: this.props.common.lpTs
    //   });
    // }
  }

  // componentWillReceiveProps(nextProps) {
  //   const {access_token} = nextProps.auth;
  //   const {initCommon, sendLongPollRequest} = this.props.commonActions;
  //   const {lpKey, lpServer, lpTs} = this.props.common;
  //   let {times} = this.state;
  //
  //   if (nextProps.common.lpTs !== this.state.lpTs && this.state.started === true) {
  //     this.setState({
  //       lpTs: nextProps.common.lpTs
  //     });
  //   }
  //
  //
  //   if (access_token.length > 0 && lpKey.length === 0 && lpServer.length === 0 && lpTs.length === 0) {
  //     initCommon(access_token);
  //   }
  //
  //   if (this.state.lpTs === '' && lpTs !== '' && this.state.started === false) {
  //     sendLongPollRequest(lpServer, lpKey, lpTs);
  //     this.setState({
  //       started: !this.state.started
  //     });
  //   }
  //
  //   if (this.state.times < 10) {
  //     console.log('Redux:', lpTs);
  //     console.log('State:', this.state.lpTs);
  //     if (lpKey.length > 0 && lpServer.length > 0 && lpTs.length > 0 && lpTs !== this.state.lpTs) {
  //       console.log('request');
  //       // sendLongPollRequest(lpServer, lpKey, lpTs);
  //       times++;
  //
  //       this.setState({lpTs, times});
  //     }
  //   }
  // }

  componentDidMount() {
    const {initAuth, authUser} = this.props.authActions;

    ipcRenderer.on('get_access_token', (event, data) => {
      // This is message for the Electron main process
      authUser(data.access_token, data.uid);
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
    auth: state.auth,
    common: state.common
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    commonActions: bindActionCreators(commonActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
