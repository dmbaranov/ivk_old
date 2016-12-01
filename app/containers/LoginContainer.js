import React, {Component} from 'react';
import {connect} from 'react-redux';

import Login from 'app/components/Login';

export class LoginContainer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== null;
  }

  render() {
    console.log('Render LoginContainer');
    return (
      <div>
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
