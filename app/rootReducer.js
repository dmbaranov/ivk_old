import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';

import auth from 'app/reducers/auth';
import user from 'app/reducers/user';
import dialogs from 'app/reducers/dialogs';

const rootReducer = combineReducers({
  auth,
  user,
  dialogs,
  routing
});

export default rootReducer;
