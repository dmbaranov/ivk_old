import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';
import { routing } from './about.routes';

@NgModule({
    declarations: [ AboutComponent ],
    exports: [ AboutComponent ],
    imports: [ routing ]
})

export class AboutModule { }