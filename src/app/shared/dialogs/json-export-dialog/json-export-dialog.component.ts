import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'avr-json-export-dialog',
  templateUrl: './json-export-dialog.component.html',
  styleUrls: ['./json-export-dialog.component.css']
})
export class JSONExportDialog implements OnInit {

  jsonData: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string, data: any }) {
    this.jsonData = JSON.stringify(this.data.data);
  }

  ngOnInit() {
  }

  copy(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

}
