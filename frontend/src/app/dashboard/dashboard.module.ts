import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from "./dashboard.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {MaterialModule} from "../material/material.module";
import {CharactersComponent} from "./characters/characters.component";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    CharactersComponent
  ]
})

export class DashboardModule {
}
