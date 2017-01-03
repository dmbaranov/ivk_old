import { Routes } from '@angular/router';
import { LoginPage } from 'app/pages/login';

import { HasTokenGuard } from 'app/guards/has-token.guard';

export const ROUTES: Routes = [
    { path: '',      redirectTo: '/home', pathMatch: 'full' },
    { path: 'home',  loadChildren: 'app/.home/home.module#HomeModule' },
    { path: 'about', loadChildren: 'app/.about/about.module#AboutModule' },
    { path: 'login', component: LoginPage, canDeactivate: [ HasTokenGuard ] }
];
