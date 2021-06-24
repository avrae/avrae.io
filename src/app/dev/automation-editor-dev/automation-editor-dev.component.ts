import {Component, OnInit} from '@angular/core';
import {stringify as YAMLStringify} from 'yaml';
import {AutomationEffect} from '../../schemas/homebrew/AutomationEffects';

@Component({
  selector: 'avr-automation-editor-dev',
  templateUrl: './automation-editor-dev.component.html',
  styleUrls: ['./automation-editor-dev.component.css']
})
export class AutomationEditorDevComponent implements OnInit {

  localSavedAutomation: AutomationEffect[] = [];

  constructor() {
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

  getLocalAutomationYaml(): string {
    return YAMLStringify(this.localSavedAutomation);
  }
}
