import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'avr-tome-json-dialog',
  templateUrl: './tome-json-dialog.component.html',
  styleUrls: ['./tome-json-dialog.component.css']
})
export class TomeJSONDialog implements OnInit {

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
