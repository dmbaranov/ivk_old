import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from 'app/containers/App';
import ProfileContainer from 'app/containers/ProfileContainer';
import DialogsListContainer from 'app/containers/DialogsListContainer';
import DialogContainer from 'app/containers/DialogContainer';
import LogoutContainer from 'app/containers/LogoutContainer';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ProfileContainer}/>
    <Route path="/dialogs" component={DialogsListContainer}/>
    <Route path="/dialog/:type/:id" component={DialogContainer}/>
    <Route path="/logout" component={LogoutContainer}/>
  </Route>

)
