import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import $ from 'jquery';

import Message from 'app/components/Message';
import MessageInput from 'app/components/MessageInput';

import * as actions from 'app/actions/messages';
import styles from './style.scss';

class MessagesContainer extends Component {


  // constructor(props,context){
  //   super(props,context);
  //   this.isAlreadyLoaded =  false;
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   let scrollToElement = document.getElementById("scroll-element");
  //   if (scrollToElement && !isAlreadyLoaded){
  //     this.isAlreadyLoaded = true;
  //     scrollToElement.scrollIntoView(true);
  //   }
  // }

  componentDidUpdate() {
    // this.refs.bottom.scrollIntoView();
    // const elem = ReactDOM.findDOMNode(this.refs.bottom);
    // elem.scrollIntoView(false);
    // document.querySelector('.lol input').scrollIntoView();

    // ReactDOM.findDOMNode(this.refs.bottom).scrollIntoView(false);

    // ReactDOM.findDOMNode(this.refs.messagesContainer).scrollIntoView(false);

    ReactDOM.findDOMNode(this.refs.container).scrollTo(0, 1000);
  }

  componentDidMount() {
    const {initMessages, saveDialogId, redirectTo} = this.props.actions;
    const {access_token} = this.props.auth;
    const {users} = this.props.dialogs;
    let dialogID = '';

    if (this.props.params.type === 'chat') {
      dialogID = +2000000000 + +this.props.params.id;
    }
    else {
      dialogID = this.props.params.id;
    }

    saveDialogId(dialogID);

    if (users.length === 0) {
      redirectTo('/dialogs');
    }
    else {
      initMessages(access_token, dialogID, users);
    }
  }

  handleSubmit = message => {
    const {access_token} = this.props.auth;
    const {addMessage} = this.props.actions;
    const {dialogID} = this.props.messages;
    const {users} = this.props.dialogs;

    addMessage(access_token, message, dialogID, users);
  };

  render() {
    const {messages} = this.props.messages;
    const messagesList = messages.map(item => {
      return <Message key={item.id} title={item.title} body={item.body} avatar={item.avatar}/>
    });

    return (
      <div className={styles.container} id="lol" ref="container">
        <div className={styles.messagesContainer} ref="messagesContainer">
          {messagesList}
          {/*<MessageInput onSubmit={this.handleSubmit} ref="input"/>*/}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    dialogs: state.dialogs,
    messages: state.messages
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);
