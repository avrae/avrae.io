import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {MaterialModule} from '../material/material.module';
import {CharactersComponent} from './characters/characters.component';
import {CustomizationComponent} from './customization/customization.component';
import {AliasListComponent} from './customization/alias-list/alias-list.component';
import {SnippetListComponent} from './customization/snippet-list/snippet-list.component';
import {UvarListComponent} from './customization/uvar-list/uvar-list.component';
import {ConfirmDeleteDialog} from './confirm-delete-dialog/confirm-delete-dialog.component';
import {EditDialog} from './edit-dialog/edit-dialog.component';
import {NewDialog} from './new-dialog/new-dialog.component';
import {FormsModule} from '@angular/forms';
import {GvarsComponent} from './gvars/gvars.component';
import {GvarListComponent} from './gvars/gvar-list/gvar-list.component';
import {HomebrewModule} from './homebrew/homebrew.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    DashboardRoutingModule,
    HomebrewModule
  ],
  declarations: [
    DashboardComponent,
    CharactersComponent,
    CustomizationComponent,
    AliasListComponent,
    SnippetListComponent,
    UvarListComponent,
    GvarsComponent,
    ConfirmDeleteDialog,
    EditDialog,
    NewDialog,
    GvarListComponent,
  ],
  entryComponents: [
    ConfirmDeleteDialog,
    EditDialog,
    NewDialog
  ]
})

export class DashboardModule {
}
