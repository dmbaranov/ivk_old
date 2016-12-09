import React, {Component} from 'react';
import {connect} from 'react-redux';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import {push} from 'react-router-redux';

import {getDialogsList} from 'app/actions/dialogs';

export class DialogsListContainer extends Component {
  componentWillMount() {
    const {access_token} = this.props.auth;
    const {dispatch} = this.props;

    dispatch(getDialogsList(access_token));
  }

  redirect = location => {
    this.props.dispatch(push(location));
  };

  renderDialogs = () => {
    const {dialogsList} = this.props.dialogs;
    return dialogsList.map((item, index) => {
      return (
        <ListItem
          key={index}
          primaryText={item.title}
          secondaryText={item.body}
          leftAvatar={<Avatar src={item.photo} />}
          onTouchTap={this.redirect.bind(this, `dialog/${item.type}/${item.uid}`)}/>
      );
    });
  };

  render() {
    const {dialogs} = this.props;
    return (
      <List>
        {this.renderDialogs()}
        {/*<DialogsList*/}
          {/*dialogsList={dialogs.dialogsList}*/}
          {/*redirect={this.redirect}/>*/}
      </List>
    )
  };
}

function mapStateToProps(state) {
  const {auth, dialogs} = state;

  return {
    auth,
    dialogs
  };
}

export default connect(mapStateToProps)(DialogsListContainer);
