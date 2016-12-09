import React, {Component} from 'react';
import {Link} from 'react-router';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';

import styles from './DialogsList.scss';

export default class DialogsList extends Component {
  getDialogsList() {
    return this.props.dialogsList.map((item, index) => {
      return (
        <ListItem
          key={index}
          primaryText={item.title}
          secondaryText={item.body}
          leftAvatar={<Avatar src={item.photo} />}
          onTouchTap={this.props.redirect.bind(this, `dialog/${item.type}/${item.uid}`)}/>
      );
      // return (
      //   <Link key={index} to={`dialog/${item.type}/${item.uid}`} className={styles.dialogItem}>
      //     <Paper
      //       zDepth={2}
      //       style={{
      //         marginTop: '15px',
      //         marginBottom: '15px',
      //         width: '100%',
      //         height: '100px'
      //       }}>
      //       <div>{item.title + ' ' + item.uid}</div>
      //       <div>{item.body}</div>
      //       <img src={item.photo}/>
      //     </Paper>
      //   </Link>
      // )
    });
  }

  render() {
    return (
      <List>
        <Subheader>Диалоги</Subheader>
        {this.getDialogsList()}
      </List>
    )
  };
}
