import React, {Component} from 'react';
import {connect} from 'react-redux';

import styles from './MenuContainer.scss';

import MenuItem from 'app/components/MenuItem';

export class MenuContainer extends Component {
  constructor() {
    super();

    this.state = {
      topMenuItems: [{
        link: '/',
        title: 'Profile'
      }, {
        link: '/dialogs',
        title: 'Dialogs'
      }],
      bottomMenuItems: [{
        link: '/logout',
        title: 'Logout'
      }]
    };
  }

  getMenu = type => {
    return this.state[type].map((item, index) => {
      return (
        <MenuItem
          key={index}
          link={item.link}
          title={item.title}/>
      )
    });
  };



  render() {
    return (
      <div className={styles.menu}>
        <div className={styles.topMenuContainer}>
          {this.getMenu('topMenuItems')}
        </div>
        <div className={styles.bottomMenuContainer}>
          {this.getMenu('bottomMenuItems')}
        </div>
      </div>
    )
  };
}

function mapStateToProps(state) {
  const {auth} = state;

  return {
    auth
  };
}

export default connect(mapStateToProps)(MenuContainer);
