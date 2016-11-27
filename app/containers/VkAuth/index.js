import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

import * as actions from './actions';

export class VkAuth extends Component {
  componentDidMount() {
    const url = window.location.href;
    const tokenIndex = url.indexOf('access_token') + 13;
    let access_token = '';

    if (tokenIndex >= 0) {
      access_token = url.substr(tokenIndex);
      this.props.actions.handleLogin(access_token);
    }
    else {
      console.log('Something went wrong');
    }

  }

  render() {
    return (
      <div></div>
    )
  }
}

function mapStateToProps(state) {
  return {
    globalState: state.globalState
  };
}

function actionStateToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, actionStateToProps)(VkAuth);
