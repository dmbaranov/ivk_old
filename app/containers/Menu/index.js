import React, {Component} from 'react';

import {MenuItem} from 'app/components/MenuItem';

export default class Menu extends Component {
  constructor() {
    super();

    this.state = {
      menuItems: [{
        title: 'Profile',
        link: '/profile'
      }, {
        title: 'Dialogs',
        link: '/dialogs'
      }]
    };
  }

  render() {
    const menuItems = this.state.menuItems.map((item, index) => {
      return (
        <MenuItem key={index} title={item.title} link={item.link}/>
      )
    });

    return (
      <div>
        {menuItems}
      </div>
    )
  }
}
