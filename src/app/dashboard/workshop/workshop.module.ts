import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material/material.module';
import {WorkshopExploreComponent} from './workshop-explore.component';

import {WorkshopRoutingModule} from './workshop-routing.module';
import { CollectionTileComponent } from './collection-tile/collection-tile.component';
import { MyWorkComponent } from './my-work/my-work.component';


@NgModule({
  declarations: [
    WorkshopExploreComponent,
    CollectionTileComponent,
    MyWorkComponent
  ],
  imports: [
    CommonModule,
    WorkshopRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class WorkshopModule {
}