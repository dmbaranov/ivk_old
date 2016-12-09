import React, {Component} from 'react';

import styles from './DialogsList.scss';

export default class Dialogs extends Component {
  getMessages() {
    return this.props.dialog.map((item, index) => {
      return (
        <div key={index} className={styles.dialogItem}>
          <div>{item.user}</div>
          <div>{item.body}</div>
          <img src={item.photo}/>
        </div>
      )
    });
  }

  render() {
    return(
      <div className={styles.dialogItem}>
        <div>{this.props.user}</div>
        <div>{this.props.body}</div>
        <img src={this.props.photo}/>
      </div>
    );
  };
}
