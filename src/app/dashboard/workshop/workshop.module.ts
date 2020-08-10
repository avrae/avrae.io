import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {WorkshopRoutingModule} from './workshop-routing.module';
import {WorkshopExploreComponent} from './workshop-explore.component';


@NgModule({
  declarations: [
    WorkshopExploreComponent
  ],
  imports: [
    CommonModule,
    WorkshopRoutingModule
  ]
})
export class WorkshopModule {
}
