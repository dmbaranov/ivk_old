import React, {Component} from 'react';

import styles from './Message.scss';

export default class Message extends Component {
  render() {
    return(
      <div className={styles.message}>
        <div>{this.props.user}</div>
        <div>{this.props.body}</div>
        <img src={this.props.photo}/>
      </div>
    );
  };
}
