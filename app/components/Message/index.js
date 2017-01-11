import React, {Component} from 'react';

import styles from './style.scss';

export class MessageComponent extends Component {
  render() {
    return(
      <div className={styles.message}>
        <div>{this.props.title}</div>
        <div>{this.props.body}</div>
        <img src={this.props.avatar}/>
      </div>
    );
  }
}

export default MessageComponent;
