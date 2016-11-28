import React, {Component} from 'react';
import {connect} from 'react-redux';

import {DialogItem} from 'app/components/DialogItem';

export class Dialogs extends Component {
  constructor() {
    super();

    this.state = {
      dialogs: []
    };
  }

  componentWillMount() {
    fetch(`https://api.vk.com/method/messages.getDialogs?access_token=${this.props.globalState.access_token}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => this.setState({dialogs: data.response}));
  }

  render() {
    const dialogItems = this.state.dialogs.map((item, index) => {
      return (
        <DialogItem key={index} message={item.body}/>
      )
    });

    return (
      <div>
        <h1>Dialogs component</h1>
        {dialogItems}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    globalState: state.globalState
  };
}

export default connect(mapStateToProps)(Dialogs);
