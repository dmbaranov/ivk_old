import { Action } from '@ngrx/store';
import { type } from 'app/type';

export const ActionTypes = {
    LOGIN:          type('[Auth] User tries to log in'),
    LOGIN_SUCCESS:  type('[Auth] User logged in successfully'),
    LOGIN_ERROR:    type('[Auth] User login error'),
    LOGOUT:         type('[Auth] User logged out')
};

export class LoginAction implements Action {
    type = ActionTypes.LOGIN;

    constructor() { }
}

export class LoginSuccessAction implements Action {
    type = ActionTypes.LOGIN_SUCCESS;

    constructor(public payload: string) { }
}

export class LoginErrorAction implements Action {
    type = ActionTypes.LOGIN_ERROR;

    constructor(public payload: string) { }
}

export class LogoutAction implements Action {
    type = ActionTypes.LOGOUT;

    constructor(public payload: string) { }
}

export type Actions
    = LoginAction
    | LogoutAction;