import React, {Component} from 'react';
import {connect} from 'react-redux';

import Login from 'app/components/Login';

export class LoginContainer extends Component {
  render() {
    return <Login {...this.props}/>;
  };
}

function mapStateToProps(state) {
  const {auth} = state;

  return {
    auth
  };
}

export default connect(mapStateToProps)(LoginContainer);
