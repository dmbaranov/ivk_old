import { Component } from '@angular/core';
import { CanComponentDeactivate } from 'app/guards/has-token.guard';

@Component({
  selector: 'login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements CanComponentDeactivate{
  constructor() { }

  canDeactivate(): boolean {
    return false;
  }
}