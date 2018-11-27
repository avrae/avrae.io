import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {CheatsheetsRoutingModule} from './cheatsheets-routing.module';
import {CheatsheetsComponent} from './cheatsheets.component';
import {DmComponent} from './dm/dm.component';
import {PlayerComponent} from './player/player.component';
import {AliasingComponent} from './aliasing/aliasing.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    CheatsheetsRoutingModule
  ],
  declarations: [
    CheatsheetsComponent,
    DmComponent,
    PlayerComponent,
    AliasingComponent
  ]
})
export class CheatsheetsModule {
}
