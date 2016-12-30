import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    { path: '',      redirectTo: '/home', pathMatch: 'full' },
    { path: 'home',  loadChildren: 'app/.home/home.module#HomeModule' },
    { path: 'about', loadChildren: 'app/.about/about.module#AboutModule' }
];
