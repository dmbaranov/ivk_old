import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';

import Dialog from 'app/components/Dialog';
import {saveDialog} from 'app/actions/dialogs';
import API from 'app/utils/API';

export class DialogContainer extends Component {
  componentWillMount() {
    const {auth, dispatch} = this.props;
    let userID = '';
    if (this.props.params.type === 'conversation') {
      userID = 200000000 + this.props.params.id;
    }
    else {
      userID = this.props.params.id;
    }

    const messages = [];
    const requiredFields = 'photo';
    let userIds = new Set();
    API.getDialogHistory(API.GET_REQUEST, auth.access_token, userID)
      .then(data => {
        data.map(item => {
          if (typeof item !== 'number') {
            userIds.add(item.uid);
            messages.push(item);
          }
        });

        userIds = [...userIds];
        API.getUserInfo(API.GET_REQUEST, auth.access_token, userIds.join(','), requiredFields)
          .then(users => {
            dispatch(saveDialog(this.makeDialogs(messages, users)));
          });
      });
  }

  componentDidMount() {
    console.log(this.refs);
    if (this.refs.lastElement) {
      ReactDOM.findDOMNode(this.refs.lastElement).scrollIntoView();
    }
  }

  // Same function in DialogsContainer, refactor it later
  makeDialogs(messages, users) {
    const userIds = users.map(user => user.uid);
    let body = '';
    return messages.map((message, index) => {
      const currentUserNumber = userIds.indexOf(messages[index].from_id);
      if (message.attachment) {
        body = message.attachments[0].type;
      }
      else if (message.fwd_messages) {
        body = 'messages';
      }
      else {
        body = message.body;
      }
      return {
        body: body,
        user: `${users[currentUserNumber].first_name} ${users[currentUserNumber].last_name}`,
        photo: `${users[currentUserNumber].photo}`
      }
    });
    // return messages.map(message => {
    //   users.map(user => {
    //     if (message.from_id === user.uid) {
    //       return {
    //         message: message.body,
    //         user: `${user.first_name} ${user.last_name}`
    //       };
    //     }
    //   });
    // });
  }

  renderDialogs = () => {
    return this.props.dialogs.dialog.map((item, index) => {
      return (
        <Dialog
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
        {this.renderDialogs()}
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

export default connect(mapStateToProps)(DialogContainer);
