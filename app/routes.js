import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'app/containers/App';
import LoginContainer from 'app/containers/Login';
import ProfileContainer from 'app/containers/Profile';
import DialogsContainer from 'app/containers/Dialogs';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={ProfileContainer} />
    <Route path='/login' component={LoginContainer} />
    <Route path='/dialogs' component={DialogsContainer} />
  </Route>
);
