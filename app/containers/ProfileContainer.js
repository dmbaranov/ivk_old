import React, {Component} from 'react';
import {connect} from 'react-redux';

import Profile from 'app/components/Profile';

import {getUserData} from 'app/actions/user';
import API from 'app/utils/API';

export class ProfileContainer extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    const {access_token} = this.props.auth;

    dispatch(getUserData(access_token));
  }

  render() {
    const {user} = this.props;

    return (
      <div>
        <h1>Profile container</h1>
        <Profile userInfo={user.userInfo}/>
      </div>
    )
  };
}

function mapStateToProps(state) {
  const {auth, user} = state;

  return {
    auth,
    user
  };
}

export default connect(mapStateToProps)(ProfileContainer);
