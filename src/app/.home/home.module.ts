import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeService } from './home.service';

@NgModule({
    declarations:   [ HomeComponent ],
    providers:      [ HomeService ],
    imports:        [ HomeRoutingModule, CommonModule ]
})

export class HomeModule { }