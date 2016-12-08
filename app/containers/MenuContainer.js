import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';

import styles from './MenuContainer.scss';
// import MenuItem from 'app/components/MenuItem';

export class MenuContainer extends Component {
  constructor() {
    super();

    this.state = {
      topMenuItems: [{
        link: '/',
        title: 'Profile',
        icon: 'ActionAndroid'
      }, {
        link: '/dialogs',
        title: 'Dialogs',
        icon: 'ActionAndroid'
      }],
      bottomMenuItems: [{
        link: '/logout',
        title: 'Logout',
        icon: <ActionAndroid/>
      }]
    };
  }

  getMenu = type => {
    return this.state[type].map((item, index) => {
      return (
        <RaisedButton
          key={index}
          label={item.title}
          fullWidth={true}
          style={{
            height: '50px'
          }}
          buttonStyle={{
            height: '50px',
            background: '#212121'
          }}
          labelStyle={{
            lineHeight: '50px',
            color: '#ffffff'
          }}
          rippleStyle={{
            color: '#ffffff',
            opacity: 0.7
          }}
          icon={<ActionAndroid/>}
          onTouchTap={this.redirect.bind(this, item.link)}/>
      );
      // return (
      //   <MenuItem
      //     className={styles.menuItem}
      //     key={index}
      //     link={item.link}
      //     title={item.title}/>
      // )
    });
  };

  redirect = location => {
    this.props.dispatch(push(location));
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
