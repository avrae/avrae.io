import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomebrewRoutingModule} from './homebrew-routing.module';
import {ItemsComponent} from "./items/items.component";
import {MaterialModule} from "../../material/material.module";
import {FormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {PackDetailComponent} from './items/pack-detail/pack-detail.component';

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
    PackDetailComponent,
  ]
})
export class HomebrewModule {
}
