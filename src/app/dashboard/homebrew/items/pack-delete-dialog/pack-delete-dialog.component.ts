import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Pack} from '../../../../schemas/homebrew/Items';

@Component({
  selector: 'avr-pack-delete-dialog',
  templateUrl: './pack-delete-dialog.component.html',
  styleUrls: ['./pack-delete-dialog.component.css']
})
export class PackDeleteDialog implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Pack) {
  }

  ngOnInit() {
  }

}
