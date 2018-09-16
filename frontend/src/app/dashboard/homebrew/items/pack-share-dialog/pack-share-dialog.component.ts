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
  shareLink: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Pack) {
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

}
