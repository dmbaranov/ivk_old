import React, {Component} from 'react';
import classnames from 'classnames';

import styles from './style.scss';

export class MessageComponent extends Component {
  render() {
    const messageClasses = classnames({
      [styles.message]: true,
      [styles.unread]: this.props.readState === 0
    });
    return(
      <div className={messageClasses}>
        <div>{this.props.title}</div>
        <div>{this.props.body}</div>
        <img className={styles.avatar} src={this.props.avatar}/>
      </div>
    );
  }
}

export default MessageComponent;
