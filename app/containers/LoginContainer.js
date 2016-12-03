import React, {Component} from 'react';
import {connect} from 'react-redux';

import Login from 'app/components/Login';

export class LoginContainer extends Component {
  render() {
    console.log('Render LoginContainer');
    return (
      <div>
        <h1>Login Container</h1>
        <Login {...this.props}/>
      </div>
    )
  };
}

function mapStateToProps(state) {
  const {auth} = state;

  return {
    auth
  };
}

export default connect(mapStateToProps)(LoginContainer);
