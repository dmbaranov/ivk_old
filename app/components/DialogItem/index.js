import React, {Component} from 'react';

export const DialogItem = props => {
  return (
    <div>
      <div>It will be title here (messages.getChat)</div>
      <div>{props.message}</div>
    </div>
  )
}
