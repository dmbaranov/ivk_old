import { Component } from '@angular/core';

@Component({
    selector: 'app',
    template: `
      <header>
        <nav>
          <a routerLink="/profile">Profile</a>
          <a routerLink="/messages">Dialogs</a>
        </nav>
      </header>
      <router-outlet></router-outlet>
    `
})
export class AppComponent {
    constructor() { }
}
