import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import styles from './style.scss';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div className={"container " + styles.container}>
        <div className={"row flex-items-xs-center " + styles.row}>
          <div className="col-xs-3 flex-xs-middle">
            One of three columns
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
