import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import MenuItem from 'app/components/MenuItem';

export class MenuContainer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== null;
  }

  render() {
    console.log('Render MenuContainer');
    return (
      <div>
        {/*<MenuItem/>*/}
        <Link to="/">Profile</Link>
        <Link to="/dialogs">Dialogs</Link>
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
