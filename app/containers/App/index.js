import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {Link} from 'react-router';

import styles from './style.scss';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  constructor() {
    super();
    this.state = {
      content: ''
    };
  }

  loginClick = () => {
    const scope = `notify,friends,photos,audio,video,
                   pages,status,notes,messages,wall,ads,
                   offline,docs,groups,notifications,email,market`;

    const url = `https://oauth.vk.com/authorize?client_id=5746998&redirect_uri=blank.html&scope=${scope}&response_type=token&v=5.60&state=123456`;

    fetch(url)
      .then(response => response.text())
      .then(result => {
        this.setState({
          content: result
        });
      });
  };

  statusClick = () => {
    VK.Auth.getLoginStatus(status => {
      console.log(status);
    });

    VK.Auth.login(response => {
      console.log(response);
    });

    // fetch('https://api.vk.com/method/users.get?user_id=219892130&v=5.52')
    //   .then(response => response.json())
    //   .then(result => {
    //   });
  }

  render() {
    return (
      <div className={"container " + styles.container}>
        <div className={"row flex-items-xs-center " + styles.row}>
          <div className="col-xs-3 flex-xs-middle">
            <div onClick={this.loginClick}>Login</div>
            <div className="content" dangerouslySetInnerHTML={{__html: this.state.content}}></div>
            <div onClick={this.statusClick}>Status</div>
            <Link to="/">Main</Link>
            <Link to="/about">About</Link>
            <Link to="/qwe">Unknown</Link>
            {this.props.children}
          </div>
        </div>
      </div>

    )
    // return(
    //   <div className={"container-fluid " + styles.container}>
    //     <div className={"row " + styles.row}>
    //       <div className={"col-xs-3 flex-xs-middle flex-items-xs-center" + " " + styles.menu}>Qwe</div>
    //       <div className={"col-xs flex-xs-middle flex-items-xs-center " + styles.content}>
    //         <div>Content</div>
    //       </div>
    //     </div>
    //     {this.props.children}
    //   </div>
    // )
  }
}
