import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MaterialModule} from '../material/material.module';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule
  ],
  declarations: [LoginComponent],
  exports: []
})
export class LoginModule {
}
