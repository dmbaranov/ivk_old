import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {List, ListItem, Avatar} from 'material-ui';

import * as actions from 'app/actions/dialogs';

export class DialogsContainer extends Component {
  componentDidMount() {
    const {access_token} = this.props.auth;
    const {initDialogsList} = this.props.actions;

    initDialogsList(access_token);
    ReactDOM.findDOMNode(this.refs.container).scrollIntoView();
  }

  redirect = location => {
    const {redirectTo} = this.props.actions;

    redirectTo(location);
  };

  render() {
    const {dialogs} = this.props.dialogs;
    const dialogsList = [];
    dialogs.forEach(item => {
      dialogsList.push(
        <ListItem key={item.id}
                  primaryText={item.title}
                  secondaryText={item.body}
                  leftAvatar={<Avatar src={item.avatar}/>}
                  onTouchTap={this.redirect.bind(this, `/dialog/${item.type}/${item.id}`)}/>
      );
    });
    // const dialogsList = Object.keys(dialogs).map(key => {
    //   return <ListItem key={dialogs[key].id}
    //                    primaryText={dialogs[key].title}
    //                    secondaryText={dialogs[key].body}
    //                    leftAvatar={<Avatar src={dialogs[key].avatar}/>}
    //                    onTouchTap={this.redirect.bind(this, `/dialog/${dialogs[key].type}/${dialogs[key].id}`)}/>
    // });
    // const dialogsList = dialogs.map((item, index) => {
    //   return <ListItem key={index}
    //                    primaryText={item.title}
    //                    secondaryText={item.body}
    //                    leftAvatar={<Avatar src={item.avatar}/>}
    //                    onTouchTap={this.redirect.bind(this, `/dialog/${item.type}/${item.id}`)}/>
    // });

    return (
      <div ref="container">
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
