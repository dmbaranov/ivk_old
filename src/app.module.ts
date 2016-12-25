import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { HomeModule } from 'pages/home/home.module';
// import { HomeComponent } from 'pages/home/home.component';

// Application wide providers
// const APP_PROVIDERS = [
//   ...APP_RESOLVER_PROVIDERS,
//   AppState
// ];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent
    ],
    imports: [ // import Angular's modules
        BrowserModule,
        FormsModule,
        HttpModule,
        HomeModule,
        RouterModule.forRoot(ROUTES)
    ],
    providers: [ // expose our Services and Providers into Angular's dependency injection
        ENV_PROVIDERS,
    ]
})
export class AppModule {
    constructor(public appRef: ApplicationRef) {}

}

