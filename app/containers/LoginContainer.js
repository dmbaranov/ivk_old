import React, {Component} from 'react';
import {connect} from 'react-redux';

import Login from 'app/components/Login';

export class LoginContainer extends Component {
  render() {
    return (
      <div>
        <Login {...this.props}/>
      </div>
    )
  };
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(LoginContainer);
