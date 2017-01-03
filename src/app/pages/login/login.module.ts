import { NgModule } from '@angular/core';

import { LoginPage } from './login.page';
import { HasTokenGuard } from 'app/guards/has-token.guard';

@NgModule({
  declarations:   [ LoginPage ],
  exports:        [ LoginPage ],
  providers:      [ HasTokenGuard ]
})

export class LoginPageModule { }