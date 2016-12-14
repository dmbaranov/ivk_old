import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Send from 'material-ui/svg-icons/content/send';

import Message from 'app/components/Message';

import {getMessages, sendMessage} from 'app/actions/dialogs';
import styles from './MessagesContainer.scss';

export class MessagesContainer extends Component {
  componentWillMount() {
    const {dispatch} = this.props;
    const {access_token} = this.props.auth;
    let userID = '';

    if (this.props.params.type === 'conversation') {
      // userID = 200000000 + this.props.params.id;
      userID = 2000000 + this.props.params.id;
    }
    else {
      userID = this.props.params.id;
    }

    dispatch(getMessages(access_token, userID));
  }

  componentDidUpdate() {
    // TODO: Try to find a better solution to scroll to the bottom of the page
    if (this.refs.container) {
      $(ReactDOM.findDOMNode(this.refs.container)).animate({scrollTop: 10000}, 100);
    }
  }

  sendMessage = e => {
    e.preventDefault();

    const {dispatch} = this.props;
    const {access_token} = this.props.auth;
    const {dialogId} = this.props.dialogs;
    const message = this.refs.tempTextField.input.value;


    dispatch(sendMessage(access_token, dialogId, message));
  };

  renderMessages = () => {
    return this.props.dialogs.dialog.map((item, index) => {
      return (
        <Message
          key={index}
          user={item.user}
          body={item.body}
          photo={item.photo}/>
      )
    });
  };

  renderContent = () => {
    const {isPending} = this.props.dialogs;
    const indicatorStyles = {
      position: 'relative'
    };

    if (isPending === true) {
      return (
        <div className={styles.indicator}>
          <RefreshIndicator
            style={indicatorStyles}
            size={50}
            status="loading"
            top={0}
            left={0}/>
        </div>
      );
    }
    else {
      return (
        <div className={styles.messagesContainer}>
          {this.renderMessages()}
          <form className={styles.inputContainer} onSubmit={this.sendMessage}>
            <TextField
              ref="tempTextField"
              floatingLabelText="Введите сообщение"
              fullWidth={true}/>
            <IconButton
              style={{
                alignSelf: 'center',
                width: 72,
                height: 72,
                padding: 16
              }}
              iconStyle={{
                width: 36,
                height: 36
              }}
              onClick={this.sendMessage}>
              <Send />
            </IconButton>
          </form>
        </div>
      );
    }
  }

  render() {
    return (
      <div className={styles.container} ref="container">
        {this.renderContent()}
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
