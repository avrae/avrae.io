import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material/material.module';
import {PipesModule} from '../../shared/pipes/pipes.module';
import {WorkshopExploreComponent} from './workshop-explore.component';

import {WorkshopRoutingModule} from './workshop-routing.module';
import { CollectionTileComponent } from './collection-tile/collection-tile.component';
import { MyWorkComponent } from './my-work/my-work.component';
import { MySubscriptionsComponent } from './my-subscriptions/my-subscriptions.component';


@NgModule({
  declarations: [
    WorkshopExploreComponent,
    CollectionTileComponent,
    MyWorkComponent,
    MySubscriptionsComponent
  ],
    imports: [
        CommonModule,
        WorkshopRoutingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        PipesModule
    ]
})
export class WorkshopModule {
}
