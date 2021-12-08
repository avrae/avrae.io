import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {stringify as YAMLStringify} from 'yaml';

export interface JSONExportDialogData {
  name: string;
  data: any;
  yaml?: boolean;  // whether or not to export to YAML instead of JSON
}

@Component({
  selector: 'avr-json-export-dialog',
  templateUrl: './json-export-dialog.component.html',
  styleUrls: ['./json-export-dialog.component.css']
})
export class JSONExportDialog implements OnInit {

  jsonData: string;
  jsonOrYaml: string = 'JSON';

  constructor(@Inject(MAT_DIALOG_DATA) public data: JSONExportDialogData) {
    if (data.yaml) {
      this.jsonOrYaml = 'YAML';
      this.jsonData = YAMLStringify(this.data.data);
    } else {
      this.jsonOrYaml = 'JSON';
      this.jsonData = JSON.stringify(this.data.data);
    }
  }

  ngOnInit() {
  }

  copy(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

}
