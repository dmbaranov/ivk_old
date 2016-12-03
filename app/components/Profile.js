import React, {Component} from 'react';
import {connect} from 'react-redux';

export default class Profile extends Component {
  render() {
    const {userInfo} = this.props;
    return (
      <div>
        <div>Name: {userInfo.first_name}</div>
        <div>Surname: {userInfo.last_name}</div>
      </div>
    )
  };
}
