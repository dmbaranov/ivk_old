import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';

// import home from './containers/Home/reducer';
import home from 'app/containers/Home/reducer';
import globalState from 'app/containers/App/reducer';

const rootReducer = combineReducers({
  globalState,
  home,
  routing
});

export default rootReducer;
