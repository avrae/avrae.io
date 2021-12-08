import {Clipboard} from '@angular/cdk/clipboard';
import {Component, HostListener, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
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

  constructor(private dialog: MatDialog, private clipboard: Clipboard, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loadLocalAutomation();
  }

  // persistence
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

  // keyboard listeners
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (!(event.ctrlKey || event.metaKey)) {
      return;
    }

    switch (event.key) {
      case 'i':  // ctrl-i: import
        event.preventDefault();
        this.beginJSONImport();
        break;
      case 'e':  // ctrl-e: copy yaml
      case 'y':  // also ctrl-y
        event.preventDefault();
        this.copyText(this.getLocalAutomationYaml(), 'YAML');
        break;
      case 'j':  // ctrl-j: copy json
        event.preventDefault();
        this.copyText(this.getLocalAutomationJson(), 'JSON');
        break;
    }
  }

  // serialization tests
  getLocalAutomationYaml(): string {
    return YAMLStringify(this.localSavedAutomation);
  }

  getLocalAutomationJson(): string {
    return JSON.stringify(this.localSavedAutomation, null, 2);
  }

  // dialog tests
  beginJSONImport() {
    const dialogRef = this.dialog.open(JSONImportDialog, {
      width: '60%',
      data: {yaml: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.localSavedAutomation = result;
        this.saveLocalAutomation();
      }
    });
  }

  beginJSONExport(automation: AutomationEffect[], allowYaml = true) {
    this.dialog.open(JSONExportDialog, {
      data: {name: 'Automation', data: automation, yaml: allowYaml},
      width: '60%'
    });
  }

  // utils
  copyText(text: string, what = '') {  // https://material.angular.io/cdk/clipboard/overview
    const pending = this.clipboard.beginCopy(text);
    let remainingAttempts = 3;
    const attempt = () => {
      const result = pending.copy();
      if (!result && --remainingAttempts) {
        setTimeout(attempt);
      } else if (result) {
        pending.destroy();
        this.snackBar.open(`Successfully copied ${what}`);
      } else {
        pending.destroy();
      }
    };
    attempt();
  }
}
