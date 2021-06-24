import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {stringify as YAMLStringify} from 'yaml';
import {AutomationEffect} from '../../schemas/homebrew/AutomationEffects';
import {JSONExportDialog} from '../../shared/dialogs/json-export-dialog/json-export-dialog.component';
import {JSONImportDialog} from '../../shared/dialogs/json-import-dialog/json-import-dialog.component';

@Component({
  selector: 'avr-automation-editor-dev',
  templateUrl: './automation-editor-dev.component.html',
  styleUrls: ['./automation-editor-dev.component.css']
})
export class AutomationEditorDevComponent implements OnInit {

  localSavedAutomation: AutomationEffect[] = [];

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadLocalAutomation();
  }

  loadLocalAutomation(): void {
    const localSave = JSON.parse(localStorage.getItem('dev-automation-editor'));
    this.localSavedAutomation = localSave || [];
  }

  saveLocalAutomation(): void {
    localStorage.setItem('dev-automation-editor', JSON.stringify(this.localSavedAutomation));
  }

  clearLocalAutomation(): void {
    localStorage.removeItem('dev-automation-editor');
    this.localSavedAutomation = [];
  }

  getLocalAutomationYaml(): string {
    return YAMLStringify(this.localSavedAutomation);
  }

  beginJSONImport() {
    const dialogRef = this.dialog.open(JSONImportDialog, {
      width: '60%',
      disableClose: true,
      data: {yaml: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.localSavedAutomation = result;
        this.saveLocalAutomation();
      }
    });
  }

  beginJSONExport(automation: AutomationEffect[]) {
    this.dialog.open(JSONExportDialog, {
      data: {name: 'Automation', data: automation, yaml: true},
      width: '60%'
    });
  }
}
