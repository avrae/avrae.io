import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MarkdownModule} from 'ngx-markdown';
import {MaterialModule} from '../../material/material.module';
import {PipesModule} from '../../shared/pipes/pipes.module';
import {AddEditorComponent} from './collection-edit/add-editor/add-editor.component';
import {CollectionEditComponent} from './collection-edit/collection-edit.component';
import {EditSettingsDialogComponent} from './collection-edit/edit-settings-dialog/edit-settings-dialog.component';
import {CollectionTileComponent} from './collection-tile/collection-tile.component';
import {CollectableDisplayComponent} from './collectable-display/collectable-display.component';
import {CollectionComponent} from './collection/collection.component';
import {EditBindingsDialogComponent} from './collection/edit-bindings-dialog/edit-bindings-dialog.component';
import {MySubscriptionsComponent} from './my-subscriptions/my-subscriptions.component';
import {MyWorkComponent} from './my-work/my-work.component';
import {NewCollectionDialogComponent} from './my-work/new-collection-dialog/new-collection-dialog.component';
import {GuildSelectFieldComponent} from './shared/guild-select-field.component';
import {PrettyUserComponent} from './shared/pretty-user.component';
import {TagChipListComponent} from './shared/tag-chip-list.component';
import {WorkshopExploreComponent} from './workshop-explore.component';

import {WorkshopRoutingModule} from './workshop-routing.module';
import { PublishDialogComponent } from './collection-edit/publish-dialog/publish-dialog.component';
import { CollectableEditComponent } from './collection-edit/collectable-edit/collectable-edit.component';
import { CreateCollectableDialogComponent } from './collection-edit/create-collectable-dialog/create-collectable-dialog.component';


@NgModule({
  declarations: [
    WorkshopExploreComponent,
    CollectionTileComponent,
    MyWorkComponent,
    MySubscriptionsComponent,
    CollectionComponent,
    TagChipListComponent,
    GuildSelectFieldComponent,
    PrettyUserComponent,
    CollectableDisplayComponent,
    EditBindingsDialogComponent,
    NewCollectionDialogComponent,
    CollectionEditComponent,
    AddEditorComponent,
    EditSettingsDialogComponent,
    PublishDialogComponent,
    CollectableEditComponent,
    CreateCollectableDialogComponent,
  ],
  imports: [
    CommonModule,
    WorkshopRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    MarkdownModule
  ]
})
export class WorkshopModule {
}
