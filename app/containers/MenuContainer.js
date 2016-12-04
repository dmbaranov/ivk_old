import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import MenuItem from 'app/components/MenuItem';

export class MenuContainer extends Component {
  render() {
    console.log('Render MenuContainer');
    return (
      <div>
        {/*<MenuItem/>*/}
        <Link to="/">Profile</Link>
        <Link to="/dialogs">Dialogs</Link>
        <Link to="/logout">Logout</Link>
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
