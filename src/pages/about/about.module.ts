import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about.routes';

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        AboutComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AboutRoutingModule
    ]
})

export class AboutModule { }