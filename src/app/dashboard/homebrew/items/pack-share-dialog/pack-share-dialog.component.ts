import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {Pack} from '../../../../schemas/homebrew/Items';
import {PackJsonDialog} from '../pack-json-dialog/pack-json-dialog.component';
import {PackMarkdownDialog} from '../pack-markdown-dialog/pack-markdown-dialog.component';
import {HomebrewService} from '../../homebrew.service';

@Component({
  selector: 'avr-pack-share-dialog',
  templateUrl: './pack-share-dialog.component.html',
  styleUrls: ['./pack-share-dialog.component.css']
})
export class PackShareDialog implements OnInit {

  public: boolean;
  shareLink: string;
  loaded: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Pack, private dialog: MatDialog, private hbService: HomebrewService) {
    this.public = data.public;
    this.shareLink = `https://avrae.io/homebrew/items/${data._id.$oid}`;
    this.loaded = data.items !== undefined;
  }

  ngOnInit() {
    if (!this.loaded) {
      this.loadItems();
    }
  }

  loadItems() {
    const id = this.data._id.$oid;
    this.hbService.getPack(id)
      .subscribe(pack => {
        this.data = pack;
        this.loaded = true;
      });
  }

  copy(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  beginJSONExport() {
    this.dialog.open(PackJsonDialog, {
      data: {name: this.data.name, data: this.data.items},
      width: '60%'
    });
  }

  beginMDExport() {
    this.dialog.open(PackMarkdownDialog, {
      data: {name: this.data.name, data: this.data},
      width: '60%'
    });
  }

}
