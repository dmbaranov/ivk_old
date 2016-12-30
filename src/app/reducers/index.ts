import {createSelector} from 'reselect';
import {ActionReducer} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import {AuthModel} from 'app/models/auth.model';
import {compose} from '@ngrx/core/compose';
import {storeFreeze} from 'ngrx-store-freeze';
import {combineReducers} from '@ngrx/store';

import * as authReducer from './auth.reducer';

export interface State {
  auth: authReducer.State,
  router: fromRouter.RouterState
}

const reducers = {
  auth: authReducer.reducer,
  router: fromRouter.routerReducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);

export function reducer(state: any, action: any) {
  return developmentReducer(state, action);
}

export const getAuthState = (state: State) => state.auth;

export const getAuthStatus = createSelector(getAuthState, authReducer.getAuthStatus);