import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {parse as YAMLParse} from 'yaml';

export interface JSONImportDialogData {
  validator?: (data: object) => void;  // if passed, should handle validating data and closing the dialog if successful
  yaml?: boolean;  // whether or not to accept YAML in addition to JSON
}

@Component({
  selector: 'avr-json-import-dialog',
  templateUrl: './json-import-dialog.component.html',
  styleUrls: ['./json-import-dialog.component.css']
})
export class JSONImportDialog implements OnInit {

  data: string;
  error: string;
  loading = false;
  jsonOrYaml: string = 'JSON';

  constructor(private dialogRef: MatDialogRef<JSONImportDialog>,
              @Inject(MAT_DIALOG_DATA) public input: JSONImportDialogData) {
  }

  ngOnInit() {
    this.jsonOrYaml = this.input.yaml ? 'YAML' : 'JSON';
  }

  validateAndExit() {
    this.loading = true;
    this.error = null;

    let parsed;
    try {
      if (this.input.yaml) {
        parsed = YAMLParse(this.data);
      } else {
        parsed = JSON.parse(this.data);
      }
    } catch (e) {
      this.error = 'Invalid data format';
      this.loading = false;
      return;
    }

    if (this.input.validator) {
      this.input.validator(parsed);
    } else {
      this.dialogRef.close(parsed);
    }
  }
}
