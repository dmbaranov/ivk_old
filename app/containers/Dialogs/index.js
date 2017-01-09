import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {List, ListItem, Avatar, RefreshIndicator} from 'material-ui';

import * as actions from 'app/actions/dialogs';

export class DialogsContainer extends Component {
  componentDidMount() {
    const {access_token} = this.props.auth;
    const {getDialogsList} = this.props.actions;

    getDialogsList(access_token);
  }

  render() {
    const {dialogs} = this.props.dialogs;
    const dialogsList = dialogs.map((item, index) => {
      return <ListItem key={index}
                       primaryText={item.title}
                       secondaryText={item.body}
                       leftAvatar={<Avatar src={item.avatar}/>}/>
    });

    return (
      <div>
        <h1>Dialogs container</h1>
        <List>
          {dialogsList}
        </List>
      </div>
    )
  };
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    dialogs: state.dialogs
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogsContainer);
