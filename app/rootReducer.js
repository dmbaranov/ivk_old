import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';

import home from './containers/Home/reducer';

const rootReducer = combineReducers({
  home,
  routing
});

export default rootReducer;
