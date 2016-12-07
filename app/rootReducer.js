import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';

import * as con from 'app/constants/auth';

import auth from 'app/reducers/auth';
import user from 'app/reducers/user';
import dialogs from 'app/reducers/dialogs';


const appReducer = combineReducers({
  auth,
  user,
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
