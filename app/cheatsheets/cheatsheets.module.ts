import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {CheatsheetsRoutingModule} from './cheatsheets-routing.module';
import {CheatsheetsComponent} from './cheatsheets.component';
import {AliasingComponent} from './aliasing/aliasing.component';
import {CheatsheetDetailComponent} from './cheatsheet-detail/cheatsheet-detail.component';
import {MarkdownModule} from 'ngx-markdown';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MarkdownModule,
    CheatsheetsRoutingModule
  ],
  declarations: [
    CheatsheetsComponent,
    AliasingComponent,
    CheatsheetDetailComponent
  ]
})
export class CheatsheetsModule {
}
