import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';

import Message from 'app/components/Message';
import {getDialog} from 'app/actions/dialogs';

export class MessagesContainer extends Component {
  componentWillMount() {
    const {dispatch} = this.props;
    const {access_token} = this.props.auth;
    let userID = '';

    if (this.props.params.type === 'conversation') {
      userID = 200000000 + this.props.params.id;
    }
    else {
      userID = this.props.params.id;
    }

    dispatch(getDialog(access_token, userID));
  }

  componentDidMount() {
    // TODO: Doesn't work properly while first load. Fix it with REQUEST DISPATCH
    if (this.refs.lastElement) {
      ReactDOM.findDOMNode(this.refs.lastElement).scrollIntoView();
    }
  }

  renderMessages = () => {
    return this.props.dialogs.dialog.map((item, index) => {
      return (
        <Message
          ref={index === this.props.dialogs.dialog.length - 1 ? 'lastElement' : ''}
          key={index}
          user={item.user}
          body={item.body}
          photo={item.photo}/>
      )
    });
  };

  render() {
    return (
      <div>
        <h1>Dialog container</h1>
        {this.renderMessages()}
      </div>
    )
  };
}

function mapStateToProps(state) {
  const {auth, dialogs} = state;

  return {
    auth,
    dialogs
  };
}

export default connect(mapStateToProps)(MessagesContainer);
