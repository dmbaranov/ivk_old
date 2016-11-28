import React, {Component} from 'react';
import {Link} from 'react-router';

export const MenuItem = props => {
  return (
    <div>
      <Link to={props.link}>{props.title}</Link>
    </div>
  )
}
