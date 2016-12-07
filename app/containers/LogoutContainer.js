import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {logoutUser} from 'app/actions/auth';

export class LogoutContainer extends Component {
  componentWillMount() {
    const {dispatch} = this.props;
    window.localStorage.removeItem('access_token');
    dispatch(logoutUser());
  }

  render() {
    return (
      <h1>Logout container</h1>
    )
  };
}

function mapStateToProps(state) {
  const {auth} = state;

  return {
    auth
  };
}

export default connect(mapStateToProps)(LogoutContainer);
