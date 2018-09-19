import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material";
import {Pack} from "../../../../schemas/homebrew/Items";
import {PackJsonDialog} from "../pack-json-dialog/pack-json-dialog.component";

@Component({
  selector: 'avr-pack-share-dialog',
  templateUrl: './pack-share-dialog.component.html',
  styleUrls: ['./pack-share-dialog.component.css']
})
export class PackShareDialog implements OnInit {

  public: boolean;
  shareLink: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Pack, private dialog: MatDialog) {
    this.public = data.public;
    this.shareLink = `https://avrae.io/homebrew/items/${data._id.$oid}`
  }

  ngOnInit() {
  }

  copy(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  beginJSONExport() {
    this.dialog.open(PackJsonDialog, {
      data: {name: this.data.name, data: this.data.items},
      width: "60%"
    });
  }

}
