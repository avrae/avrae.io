import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from "./dashboard.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {MaterialModule} from "../material/material.module";
import {CharactersComponent} from "./characters/characters.component";
import {CustomizationComponent} from './customization/customization.component';
import {AliasListComponent} from './customization/alias-list/alias-list.component';
import {SnippetListComponent} from './customization/snippet-list/snippet-list.component';
import {UvarListComponent} from './customization/uvar-list/uvar-list.component';
import {ConfirmDeleteDialog} from './confirm-delete-dialog/confirm-delete-dialog.component';
import {EditDialog} from './edit-dialog/edit-dialog.component';
import {NewDialog} from './new-dialog/new-dialog.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    CharactersComponent,
    CustomizationComponent,
    AliasListComponent,
    SnippetListComponent,
    UvarListComponent,
    ConfirmDeleteDialog,
    EditDialog,
    NewDialog
  ],
  entryComponents: [
    ConfirmDeleteDialog,
    EditDialog,
    NewDialog
  ]
})

export class DashboardModule {
}
