import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as reducer from 'app/reducers';
import * as actions from 'app/actions/auth.actions';


import { HomeService } from './home.service';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  message: string;
  authStatus$: any;

  constructor(
    private homeService: HomeService,
    private store: Store<reducer.State>
  ) {

  }

  ngOnInit() {
    this.message = this.homeService.getData();
    this.authStatus$ = this.store.select(reducer.getAuthStatus);
  }

  handleLogin():void {
    this.store.dispatch(new actions.LoginAction());
  }
}
