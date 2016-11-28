import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, hashHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import './openapi';
import './bootstrap.global.css';
import './bootstrap';

import routes from './routes';
import configureStore from './store/configureStore';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes}/>
  </Provider>,
  document.querySelector('#root')
);
