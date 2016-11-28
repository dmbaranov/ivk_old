import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

import LoginComponent from 'app/components/Login/';
import Menu from 'app/containers/Menu';

import { CLIENT_ID } from 'app/secret';
import * as actions from './actions';
import styles from './style.scss';

export class App extends Component {
  static PropTypes = {
    children: PropTypes.element.isRequired
  };

  componentWillMount() {
    const access_token = window.localStorage.getItem('access_token');

    if (access_token) {
      this.props.actions.handleLogin(access_token);

      if (this.props.location.pathname !== '/profile') {
        hashHistory.push('/profile');
      }
    }
  }

  componentDidMount() {
    // You can delete this method later
    // It's used only for demonstration of IPC
    const {ipcRenderer} = require('electron');
    ipcRenderer.on('info', (event, data) => {
      console.log(data.message);
    });
  }

  onDivClick = () => {
    // You can delete this method later
    // It's used only for demonstration of IPC
    const {remote, ipcRenderer} = require('electron');

    remote.getGlobal('sharedObj').prop1 = 125;
    ipcRenderer.send('show-sharedObj');
  };

  getMainScreen = () => {
    if (this.props.globalState.isLoggedIn) {
      return (
        <div className={'row ' + styles.row}>
          <div className={'col-xs-3 ' + styles.menu}>
            <Menu />
          </div>
          <div className={'col-xs ' + styles.content}>
            {this.props.children}
          </div>
        </div>
      )
    }
    else {
      return (
        <div className='col-xs flex-xs-middle'>
          <LoginComponent handleLogin={this.handleLogin}/>
          {this.props.children}
        </div>
      )
    }
};

  render() {
    let mainScreen = this.getMainScreen();
    return (
      <div className={'container-fluid ' + styles.container}>
        { mainScreen }
      </div>
    )
  };
}

function mapStateToProps(state) {
  return {
    globalState: state.globalState
  };
}

function actionsStateToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, actionsStateToProps)(App);
