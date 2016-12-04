import React, {Component} from 'react';
import {connect} from 'react-redux';

import DialogsList from 'app/components/DialogsList';
import {saveDialogsList} from 'app/actions/dialogs';
import API from 'app/utils/API';

export class DialogsListContainer extends Component {
  componentWillMount() {
    const {access_token} = this.props.auth;
    const {dispatch} = this.props;
    const messages = [], usersIds = [];

    API.getDialogsList(API.GET_REQUEST, access_token)
      .then(data => {
        data.map(item => {
          if (typeof item !== 'number') {
            usersIds.push(item.uid);
            messages.push(item);
          }
        });

        API.getUserInfo(API.GET_REQUEST, access_token, usersIds.join(','))
          .then(users => {
            dispatch(saveDialogsList(this.makeDialogs(messages, users)));
          });
      });
  }

  makeDialogs(dialogs, users) {
    return dialogs.map((item, index) => {
      let title = '', body = '', uid = '', type = '';

      if (item.chat_id) {
        uid = item.chat_id;
      }
      else {
        uid = users[index].uid;
      }

      // if it's a conversation
      if (item.title !== '' && item.title !== ' ... ') {
        title = item.title;
        type = 'conversation';
        if (item.attachment) {
          body = item.attachments[0].type;
        }
        else if (item.fwd_messages) {
          body = 'message';
        }
        else {
          body = item.body;
        }
      }
      // if it's a dialog with a single user
      else if (item.uid) {
        title = `${users[index].first_name} ${users[index].last_name}`;
        type = 'single';
        if (item.attachment) {
          body = item.attachments[0].type;
        }
        else if (item.fwd_messages) {
          body = 'message';
        }
        else {
          body = item.body;
        }
      }
      return {
        title: title,
        body: body,
        uid: uid,
        type: type
      };
    });
  }

  render() {
    const {dialogs} = this.props;
    return (
      <div>
        <h1>DialogsList Container</h1>
        <DialogsList dialogsList={dialogs.dialogsList}/>
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

export default connect(mapStateToProps)(DialogsListContainer);
