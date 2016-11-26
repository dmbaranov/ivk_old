import React, {Component, PropTypes} from 'react';

export default class Any extends Component {
  getParamsByName = () => {
    const url = window.location.href;
    const startIndex = url.indexOf('access_token');

    const token = url.substr(startIndex + 13);

    // https://api.vk.com/method/METHOD_NAME?PARAMETERS&access_token=ACCESS_TOKEN&v=V
    fetch(`https://api.vk.com/method/messages.get?access_token=${token}&v=5.12`)
      .then(response => response.json())
      .then(result => {
        console.log(result);
      });
  };

  render() {
    this.getParamsByName();
    return (
      <div>404 page</div>
    )
  }
}
