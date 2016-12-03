import React, {Component} from 'react';
import {connect} from 'react-redux';

import DialogsList from 'app/components/DialogsList';
import {saveDialogsList} from 'app/actions/dialogs';
import API from 'app/utils/API';

export class DialogsListContainer extends Component {
  componentWillMount() {
    const {dispatch} = this.props;
    const messages = [], usersIds = [];
    API.getDialogsList(API.GET_REQUEST, this.props.auth.access_token)
      .then(data => {
        data.map(item => {
          if (typeof item !== 'number') {
            usersIds.push(item.uid);
            messages.push(item);
          }
        });

        API.getUserInfo(API.GET_REQUEST, this.props.auth.access_token, usersIds.join(','))
          .then(users => {
            dispatch(saveDialogsList(this.makeDialogs(messages, users)));
          });
      });
  }

  makeDialogs(dialogs, users) {
    return dialogs.map((item, index) => {
      if (item.title !== '' && item.title !== ' ... ') {
        if (item.attachment) {
          return {
            title: item.title,
            body: item.attachments[0].type
          };
        }
        else if (item.fwd_messages) {
          return {
            title: item.title,
            body: 'message'
          };
        }
        else {
          return {
            title: item.title,
            body: item.body
          };
        }
      }
      else if (item.uid) {
        if (item.attachment) {
          return {
            title: `${users[index].first_name} ${users[index].last_name}`,
            body: item.attachments[0].type
          };
        }
        else if (item.fwd_messages) {
          return {
            title: `${users[index].first_name} ${users[index].last_name}`,
            body: 'messages;'
          };
        }
        else {
          return {
            title: `${users[index].first_name} ${users[index].last_name}`,
            body: item.body
          }
        }
      }
    });
  }

  render() {
    return (
      <div>
        <h1>DialogsList Container</h1>
        <DialogsList dialogsList={this.props.dialogs.dialogsList}/>
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
