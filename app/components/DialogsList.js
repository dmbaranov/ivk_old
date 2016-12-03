import React, {Component} from 'react';

import styles from './DialogsList.scss';

export default class DialogsList extends Component {
  getDialogsList() {
    return this.props.dialogsList.map((item, index) => {
      return (
        <div key={index} className={styles.dialogItem}>
          <div>{item.title}</div>
          <div>{item.body}</div>
        </div>
      )
    });
  }

  render() {
    return (
      <div>
        <div>DialogsList component</div>
        {this.getDialogsList()}
      </div>
    )
  };
}
