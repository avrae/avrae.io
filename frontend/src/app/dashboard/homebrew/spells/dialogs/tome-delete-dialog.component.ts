import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";
import {Tome} from "../../../../schemas/homebrew/Spells";

@Component({
  selector: 'avr-tome-delete-dialog',
  templateUrl: './tome-delete-dialog.component.html',
})
export class TomeDeleteDialog implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Tome) {
  }

  ngOnInit() {
  }

}
