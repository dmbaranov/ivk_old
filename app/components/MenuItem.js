import React, {Component} from 'react';
import {Link} from 'react-router';

import styles from './MenuItem.scss';

export default class MenuItem extends Component {
  render() {
    return (
      <Link className={styles.menuItem} to={this.props.link}>{this.props.title}</Link>
    )
  };
}
