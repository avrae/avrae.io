import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomebrewRoutingModule} from './homebrew-routing.module';
import {ItemsComponent} from "./items/items.component";
import {MaterialModule} from "../../material/material.module";
import {FormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    HomebrewRoutingModule,
  ],
  declarations: [
    ItemsComponent,
  ]
})
export class HomebrewModule {
}
