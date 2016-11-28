import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';

import globalState from 'app/containers/App/reducer';

const rootReducer = combineReducers({
  globalState,
  routing
});

export default rootReducer;
