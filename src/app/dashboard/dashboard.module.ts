import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';
import {AutomationEditorModule} from '../shared/automation-editor/automation-editor.module';
import {AttackEditorDialog} from './characters/attack-editor-dialog/attack-editor-dialog.component';
import {CharactersComponent} from './characters/characters.component';
import {ConfirmDeleteDialog} from './confirm-delete-dialog/confirm-delete-dialog.component';
import {AliasListComponent} from './customization/alias-list/alias-list.component';
import {CustomizationComponent} from './customization/customization.component';
import {SnippetListComponent} from './customization/snippet-list/snippet-list.component';
import {UvarListComponent} from './customization/uvar-list/uvar-list.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {EditDialog} from './edit-dialog/edit-dialog.component';
import {GvarListComponent} from './gvars/gvar-list/gvar-list.component';
import {GvarsComponent} from './gvars/gvars.component';
import {HomebrewModule} from './homebrew/homebrew.module';
import {NewDialog} from './new-dialog/new-dialog.component';
import { GvarLookupComponent } from './gvars/gvar-lookup/gvar-lookup.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    DashboardRoutingModule,
    HomebrewModule,
    FlexModule,
    AutomationEditorModule
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
    AttackEditorDialog,
    GvarListComponent,
    GvarLookupComponent,
  ],
  entryComponents: [
    ConfirmDeleteDialog,
    EditDialog,
    NewDialog,
    AttackEditorDialog
  ]
})

export class DashboardModule {
}
