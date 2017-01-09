import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import * as con from 'app/constants/auth';
import auth from './auth';
import profile from './profile';
import dialogs from './dialogs';

const appReducer = combineReducers({
  auth,
  profile,
  dialogs,
  routing
});

const rootReducer = (state, action) => {
  if (action.type === con.LOGOUT_USER) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
