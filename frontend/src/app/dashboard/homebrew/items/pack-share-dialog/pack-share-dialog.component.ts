import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";
import {Pack} from "../../../../schemas/homebrew/Items";

@Component({
  selector: 'avr-pack-share-dialog',
  templateUrl: './pack-share-dialog.component.html',
  styleUrls: ['./pack-share-dialog.component.css']
})
export class PackShareDialog implements OnInit {

  public: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Pack) {
    this.public = data.public;
  }

  ngOnInit() {
  }

}
