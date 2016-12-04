import React, {Component} from 'react';
import {Link} from 'react-router';

import styles from './DialogsList.scss';

export default class DialogsList extends Component {
  getDialogsList() {
    return this.props.dialogsList.map((item, index) => {
      return (
        <Link key={index} to={`dialog/${item.type}/${item.uid}`} className={styles.dialogItem}>
          <div>{item.title + ' ' + item.uid}</div>
          <div>{item.body}</div>
        </Link>
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
