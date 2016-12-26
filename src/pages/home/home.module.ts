import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeService } from './home.service';

@NgModule({
    declarations:   [ HomeComponent ],
    providers:      [ HomeService ],
    imports:        [ HomeRoutingModule ]
})

export class HomeModule { }