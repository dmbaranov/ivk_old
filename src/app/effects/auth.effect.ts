import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {of} from 'rxjs/observable/of';

import {AuthService} from 'app/core/auth.service';
import {Observable} from 'rxjs/Rx';
import * as auth from 'app/actions/auth.actions';


@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {
  }

  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.LOGIN)
    .map((action: auth.LoginAction) => action)
    .switchMap(() => {
      return this.authService.loginUser()
        .map(token => {
          return new auth.LoginSuccessAction(token)
        })
        .catch(() => of(new auth.LoginErrorAction('Error')))
    });
}