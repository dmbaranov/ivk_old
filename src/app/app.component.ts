import { Component, ViewEncapsulation } from '@angular/core';

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
<ngrx-store-log-monitor toggleCommand="ctrl-h" positionCommand="ctrl-m"></ngrx-store-log-monitor>
    `,
    styleUrls: ['./normalize.scss', './app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    constructor() { }
}
