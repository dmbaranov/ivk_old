import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from 'app/containers/App';
import About from 'app/containers/About';
import Home from 'app/containers/Home';
import VkAuth from 'app/containers/VkAuth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/about" component={About} />
    <Route path="/vk-auth-success" component={VkAuth}/>
  </Route>

)
