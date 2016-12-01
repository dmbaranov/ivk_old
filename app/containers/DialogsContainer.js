import React, {Component} from 'react';
import {connect} from 'react-redux';

export class DialogsContainer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== null;
  }

  render() {
    console.log('Render DialogsContainer');
    return (
      <div>
        <h1>Dialogs component</h1>
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

export default connect(mapStateToProps)(DialogsContainer);
