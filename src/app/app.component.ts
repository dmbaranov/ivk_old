import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';

import * as reducer from 'app/reducers';

@Component({
    selector: 'app',
    template: `
        <div class="app">
          <div class="menu">
            <side-menu></side-menu>
          </div>
          <div class="content">
            <router-outlet></router-outlet>
          </div>
        </div>
        <!--<div *ngIf="isAuthenticated" class="app">-->
          <!--<div class="menu">-->
            <!--<side-menu></side-menu>-->
          <!--</div>-->
          <!--<div class="content">-->
            <!--<router-outlet></router-outlet>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div *ngIf="!isAuthenticated">-->
          <!--<router-outlet></router-outlet>-->
        <!--</div>-->
        <ngrx-store-log-monitor toggleCommand="ctrl-h" positionCommand="ctrl-m"></ngrx-store-log-monitor>
    `,
    styleUrls: ['./normalize.scss', './app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    isAuthenticated: boolean;

    constructor(private store: Store<reducer.State>) { }

    ngOnInit() {
        this.store.select(reducer.getAuthStatus).subscribe(status => {
            this.isAuthenticated = status;
        });
    }
}
