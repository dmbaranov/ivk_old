import React, {Component} from 'react';
import {connect} from 'react-redux';

import Profile from 'app/components/Profile';
import {saveUser} from 'app/actions/user';
import API from 'app/utils/API';

export class ProfileComponent extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    API.getProfileInfo(API.GET_REQUEST, this.props.auth.access_token)
      .then(data => {
        dispatch(saveUser(data));
      });
  }

  render() {
    return (
      <div>
        <h1>Profile container</h1>
        <Profile userInfo={this.props.user.userInfo}/>
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

export default connect(mapStateToProps)(ProfileComponent);
