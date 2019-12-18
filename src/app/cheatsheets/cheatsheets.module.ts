import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MarkdownModule} from 'ngx-markdown';
import {MaterialModule} from '../material/material.module';
import {CheatsheetsRoutingModule} from './cheatsheets-routing.module';
import {CheatsheetsComponent} from './cheatsheets.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MarkdownModule,
    CheatsheetsRoutingModule
  ],
  declarations: [
    CheatsheetsComponent
  ]
})
export class CheatsheetsModule {
}
