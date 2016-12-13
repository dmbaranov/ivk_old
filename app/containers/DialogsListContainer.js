import React, {Component} from 'react';
import {connect} from 'react-redux';
import Avatar from 'material-ui/Avatar';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {List, ListItem} from 'material-ui/List';
import {push} from 'react-router-redux';

import {getDialogsList} from 'app/actions/dialogs';
import styles from './DialogsListContainer.scss';

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

  renderContent() {
    const {isPending} = this.props.dialogs;
    const indicatorStyles = {
      position: 'relative'
    };

    if (isPending === true) {
      return (
        <RefreshIndicator
          className={styles.indicator}
          style={indicatorStyles}
          size={50}
          status="loading"
          top={0}
          left={0}/>
      )
    }
    else {
      return (
        <List>
          {this.renderDialogs()}
        </List>
      )
    }
  }

  render() {
    return (
      <div className={styles.container}>
        {this.renderContent()}
      </div>
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
