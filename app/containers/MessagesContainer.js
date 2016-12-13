import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Send from 'material-ui/svg-icons/content/send';

import Message from 'app/components/Message';

import {getMessages} from 'app/actions/dialogs';
import styles from './MessagesContainer.scss';

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

    dispatch(getMessages(access_token, userID));
  }

  componentDidUpdate() {
    // TODO: Try to find a better solution to scroll to the bottom of the page
    if (this.refs.container) {
      $(ReactDOM.findDOMNode(this.refs.container)).animate({scrollTop: 10000}, 100);
    }
  }


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

  renderContent() {
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
          <div className={styles.inputContainer}>
            <TextField
              floatingLabelText="Введите сообщение"
              multiLine={true}
              rows={4}
              rowsMax={4}
              fullWidth={true}/>
            <IconButton
              style={{
                alignSelf: 'center',
                width: 120,
                height: 120,
                padding: 30
              }}
              iconStyle={{
                width: 60,
                height: 60
              }}>
              <Send />
            </IconButton>
          </div>
        </div>
      );
      // return (
      //   <div>
      //     {this.renderMessages()}
      //     <div className={styles.inputContainer}>
      //       <TextField
      //         floatingLabelText="Введите сообщение"
      //         multiLine={true}
      //         rowsMax={2}
      //         fullWidth={true}/>
      //     </div>
      //   </div>
      // );
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
