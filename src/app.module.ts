import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routing';

import { AppComponent } from './app.component';

@NgModule({
    bootstrap:      [ AppComponent ],
    declarations:   [ AppComponent ],
    imports:        [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(ROUTES, { useHash: true})
    ],
    providers:      [ ENV_PROVIDERS ]
})
export class AppModule {
    constructor(public appRef: ApplicationRef) {}

}

