import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import LoginComponent from 'app/components/Login/index';

import { CLIENT_ID } from 'app/secret';
import * as actions from './actions';
import styles from './style.scss';

export class App extends Component {
  static PropTypes = {
    children: PropTypes.element.isRequired
  };

  onDivClick = () => {
    const {remote, ipcRenderer} = require('electron');

    remote.getGlobal('sharedObj').prop1 = 125;
    ipcRenderer.send('show-sharedObj');
  };

  render() {
    return (
      <div className={'container-fluid ' + styles.container}>
        <div className={'row ' + styles.row}>
          {
            this.props.globalState.isLoggedIn ?
              <div>Logged in</div>
              :
              <div className={'col-xs flex-xs-middle ' + styles.loginComponent}>
                <LoginComponent handleLogin={this.handleLogin}/>
                <div onClick={this.onDivClick}>Lol</div>
              </div>

          }
          {this.props.children}
        </div>
      </div>
    )
  };
}

function mapStateToProps(state) {
  return {
    globalState: state.globalState
  };
}

function actionsStateToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, actionsStateToProps)(App);

// import React, {Component, PropTypes} from 'react';
// import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';
//
// import * as actions from 'containers/App/actions';
//
// import styles from './style.scss';
//
// export class App extends Component {
//   static propTypes = {
//     children: PropTypes.element.isRequired
//   };
//
//   constructor() {
//     super();
//     this.state = {
//       content: ''
//     };
//   }
//
//   loginClick = () => {
//     const scope = `notify,friends,photos,audio,video,pages,status,notes,messages,wall,ads,offline,docs,groups,notifications,email,market`;
//
//     const url = `https://oauth.vk.com/authorize?client_id=5746998&redirect_uri=blank.html&scope=${scope}&response_type=token&v=5.60&state=123456`;
//
//     fetch(url)
//       .then(response => response.text())
//       .then(result => {
//         this.setState({
//           content: result
//         });
//       });
//   };
//
//   render() {
//     return (
//       <div className={'container-fluid ' + styles.container}>
//         <div className={'row ' + styles.row}>
//           <div className={'col-xs-3 flex-xs-middle ' + styles.menu}></div>
//         </div>
//       </div>
//     )
//   }
// }
//
// function mapStateToProps(state) {
//   return {
//     global: state.home
//   }
// }
//
// function actionStateToProps(dispatch) {
//   return {
//     actions: bindActionCreators(actions, dispatch)
//   }
// }
//
// export default connect(mapStateToProps, actionStateToProps)(App)
//
// return (
//   <div className={"container " + styles.container}>
//     <div className={"row flex-items-xs-center " + styles.row}>
//       <div className="col-xs-3 flex-xs-middle">
//         <div onClick={this.loginClick}>Login</div>
//         <div className="content" dangerouslySetInnerHTML={{__html: this.state.content}}></div>
//         <div onClick={this.statusClick}>Status</div>
//         <Link to="/">Main</Link>
//         <Link to="/about">About</Link>
//         <Link to="/qwe">Unknown</Link>
//         {this.props.children}
//       </div>
//     </div>
//   </div>
//
// )
