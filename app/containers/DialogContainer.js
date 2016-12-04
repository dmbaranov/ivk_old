import React, {Component} from 'react';
import {connect} from 'react-redux';

import Dialog from 'app/components/Dialog';
import {saveDialog} from 'app/actions/dialogs';
import API from 'app/utils/API';

export class DialogContainer extends Component {
  componentDidMount() {
    const {auth, dispatch} = this.props;
    const userID = this.props.params.id;
    const messages = [];
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
        API.getUserInfo(API.GET_REQUEST, auth.access_token, userIds.join(','))
          .then(users => {
            dispatch(saveDialog(this.makeDialogs(messages, users)));
          });
      });
  }

  // Same function in DialogsContainer, refactor it later
  makeDialogs(messages, users) {
    const userIds = users.map(user => user.uid);
    return messages.map((message, index) => {
      const currentUserNumber = userIds.indexOf(messages[index].from_id);
      // if (message.from_id === currentUserId) {
      //   return {
      //     message: message.body,
      //     user: `${users[curre]}`
      //   }
      // }
      return {
        message: message.body,
        user: `${users[currentUserNumber].first_name} ${users[currentUserNumber].last_name}`
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

  render() {
    const {dialogs} = this.props;
    return (
      <div>
        <h1>Dialog container</h1>
        <Dialog dialog={dialogs.dialog}/>
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
