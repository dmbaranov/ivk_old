import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from 'app/containers/App';
import Profile from 'app/containers/Profile';
import Dialogs from 'app/containers/Dialogs';
import VkAuth from 'app/containers/VkAuth';

export default (
  <Route path="/" component={App}>
    <Route path="/profile" component={Profile}/>
    <Route path="/dialogs" component={Dialogs}/>
    <Route path="/vk-auth-success" component={VkAuth}/>
  </Route>

)
