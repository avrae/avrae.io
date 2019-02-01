import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginWidgetComponent } from './login-widget/login-widget.component';
import {LoginComponent} from "./login.component";
import {MaterialModule} from "../material/material.module";

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule
  ],
  declarations: [LoginComponent, LoginWidgetComponent],
  exports: [LoginWidgetComponent]
})
export class LoginModule { }
