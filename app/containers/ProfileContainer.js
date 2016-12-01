import React, {Component} from 'react';
import {connect} from 'react-redux';

export class ProfileComponent extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== null;
  }

  render() {
    console.log('Render ProfileComponent');
    return (
      <div>
        <h1>Profile component</h1>
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

export default connect(mapStateToProps)(ProfileComponent);
