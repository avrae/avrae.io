import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material/material.module';
import {PipesModule} from '../../shared/pipes/pipes.module';
import {CollectionTileComponent} from './collection-tile/collection-tile.component';
import {CollectionComponent} from './collection/collection.component';
import {MySubscriptionsComponent} from './my-subscriptions/my-subscriptions.component';
import {MyWorkComponent} from './my-work/my-work.component';
import {TagChipListComponent} from './shared/tag-chip-list.component';
import {WorkshopExploreComponent} from './workshop-explore.component';

import {WorkshopRoutingModule} from './workshop-routing.module';
import { GuildSelectFieldComponent } from './shared/guild-select-field.component';


@NgModule({
  declarations: [
    WorkshopExploreComponent,
    CollectionTileComponent,
    MyWorkComponent,
    MySubscriptionsComponent,
    CollectionComponent,
    TagChipListComponent,
    GuildSelectFieldComponent
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
