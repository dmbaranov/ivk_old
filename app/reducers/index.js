import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import * as con from 'app/constants/auth';
import auth from './auth';

const appReducer = combineReducers({
  auth,
  routing
});

const rootReducer = (state, action) => {
  if (action.type === con.LOGOUT_USER) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
