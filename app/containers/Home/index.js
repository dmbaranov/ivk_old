import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import UserName from '../../components/HomeString/index';
import * as actions from './actions';

export class Home extends Component {
  onButtonClick = () => {
    this.props.actions.changeName();
  };

  render() {
    const {name} = this.props.home;
    return(
      <div>
        <h2>Hey there <UserName name={name}/>, this is an Home component!</h2>
        <button onClick={this.onButtonClick} className="btn btn-primary">Change state</button>
      </div>
    )
  };
}

function mapStateToProps(state) {
  return {
    home: state.home
  }
}

function actionStateToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, actionStateToProps)(Home)
