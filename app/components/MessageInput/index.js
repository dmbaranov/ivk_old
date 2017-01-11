import React, {Component} from 'react';
import {TextField, IconButton} from 'material-ui';
import Send from 'material-ui/svg-icons/content/send';

import styles from './style.scss';

export class MessagesInput extends Component {
  constructor() {
    super();

    this.state = {
      message: ''
    };
  }

  handleMessageInput = (e, value) => {
    this.setState({
      message: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.message);
    this.setState({
      message: ''
    });
  };

  render() {
    return (
      <form className={styles.inputContainer} onSubmit={this.handleSubmit}>
        <TextField
          value={this.state.message}
          onChange={this.handleMessageInput}
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
          onClick={this.handleSubmit}>
          <Send />
        </IconButton>
      </form>
    )
  }
}

export default MessagesInput
