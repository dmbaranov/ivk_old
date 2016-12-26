import { NgModule } from '@angular/core';

import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';

@NgModule({
    declarations:   [ AboutComponent ],
    imports:        [ AboutRoutingModule ]
})

export class AboutModule { }