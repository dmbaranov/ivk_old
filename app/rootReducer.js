import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';

import auth from 'app/reducers/auth';
import user from 'app/reducers/user';

const rootReducer = combineReducers({
  auth,
  user,
  routing
});

export default rootReducer;
