import React, {Component} from 'react';
import {connect} from 'react-redux';

export class Profile extends Component {
  constructor() {
    super();

    this.state = {
      bdate: '',
      first_name: '',
      home_town: '',
      last_name: '',
      status: ''
    };
  }

  componentWillMount() {
    fetch(`https://api.vk.com/method/account.getProfileInfo?access_token=${this.props.globalState.access_token}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => this.setState(data.response));
  }

  render() {
    return (
      <div>
        <h1>Profile component</h1>
        <div>Name: {this.state.first_name}</div>
        <div>Surname: {this.state.last_name}</div>
        <div>Birthday: {this.state.bdate}</div>
        <div>Home town: {this.state.home_town}</div>
        <div>Status: {this.state.status}</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    globalState: state.globalState
  };
}

export default connect(mapStateToProps)(Profile);
