import 'hammerjs';
import {NgModule, ApplicationRef} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { MaterialModule } from '@angular/material';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {RouterStoreModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor'

import {AuthEffects} from 'app/effects/auth.effect';
import { reducer } from 'app/reducers';

import {ROUTES} from './app.routing';

import {CoreModule} from 'app/core/core.module';
import {LoginPageModule} from 'app/pages/login/login.module';
import {AppComponent} from './app.component';
import {SideMenuComponent} from 'app/components/side-menu/side-menu.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, SideMenuComponent],
  imports: [
    BrowserModule,
    CoreModule,
    LoginPageModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(ROUTES, {useHash: true}),
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentStore({
      monitor: useLogMonitor({
        visible: true,
        position: 'right'
      })
    }),
    StoreLogMonitorModule,
    EffectsModule.run(AuthEffects)
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {
  }
}

