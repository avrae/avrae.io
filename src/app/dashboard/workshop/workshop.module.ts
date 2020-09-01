import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MarkdownModule} from 'ngx-markdown';
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
import { PrettyUserComponent } from './shared/pretty-user.component';
import { CollectableDisplayComponent } from './collection/collectable-display/collectable-display.component';
import { EditBindingsDialogComponent } from './collection/edit-bindings-dialog/edit-bindings-dialog.component';
import { NewCollectionDialogComponent } from './my-work/new-collection-dialog/new-collection-dialog.component';
import { CollectionEditComponent } from './collection-edit/collection-edit.component';
import { AddEditorComponent } from './collection-edit/add-editor/add-editor.component';


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
    AddEditorComponent
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
