import React, {Component} from 'react';
import {connect} from 'react-redux';

export class Profile extends Component {
  render() {
    const {userInfo} = this.props.user;
    return (
      <div>
        <div>Name: {userInfo.first_name}</div>
        <div>Surname: {userInfo.last_name}</div>
      </div>
    )
  };
}

function mapStateToProps(state) {
  const {user} = state;

  return {
    user
  };
}

export default connect(mapStateToProps)(Profile);
