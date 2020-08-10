import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material/material.module';
import {WorkshopExploreComponent} from './workshop-explore.component';

import {WorkshopRoutingModule} from './workshop-routing.module';


@NgModule({
  declarations: [
    WorkshopExploreComponent
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
