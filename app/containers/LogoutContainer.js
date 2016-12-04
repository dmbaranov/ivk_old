import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {logoutUser} from 'app/actions/auth';

export class LogoutContainer extends Component {
  componentWillMount() {
    const {dispatch} = this.props;
    setTimeout(() => {
      window.localStorage.removeItem('access_token');
      window.location.reload();
      dispatch(logoutUser());
      dispatch(push('/'));
    }, 2000);
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
