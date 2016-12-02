import React, {Component} from 'react';
import {connect} from 'react-redux';

import Profile from 'app/components/Profile';
import {saveUser} from 'app/actions/user';
import API from 'app/utils/API';

export class ProfileComponent extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== null;
  }

  componentWillMount() {
    const {dispatch} = this.props;
    API.getProfileInfo(API.GET_REQUEST, this.props.auth.access_token)
      .then(data => {
        dispatch(saveUser(data));
      });
  }

  render() {
    console.log('Render ProfileComponent');
    return (
      <div>
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
