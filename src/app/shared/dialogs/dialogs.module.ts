import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../material/material.module';
import {JSONExportDialog} from './json-export-dialog/json-export-dialog.component';
import {JSONImportDialog} from './json-import-dialog/json-import-dialog.component';
import {SRDCopyDialog} from './srd-copy-dialog/srd-copy-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    FlexModule
  ],
  declarations: [
    JSONExportDialog,
    JSONImportDialog,
    SRDCopyDialog
  ],
  entryComponents: [
    JSONExportDialog,
    JSONImportDialog,
    SRDCopyDialog
  ]
})
export class DialogsModule {
}
