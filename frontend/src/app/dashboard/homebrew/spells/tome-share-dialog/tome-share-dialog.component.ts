import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material";
import {HomebrewService} from "../../homebrew.service";
import {Tome} from "../../../../schemas/homebrew/Spells";

@Component({
  selector: 'avr-pack-share-dialog',
  templateUrl: './tome-share-dialog.component.html',
  styleUrls: ['./tome-share-dialog.component.css']
})
export class TomeShareDialog implements OnInit {

  public: boolean;
  shareLink: string;
  loaded: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Tome, private dialog: MatDialog,
              private hbService: HomebrewService) {
    this.public = data.public;
    this.shareLink = `https://avrae.io/homebrew/spells/${data._id.$oid}`;
    this.loaded = data.spells !== undefined;
  }

  ngOnInit() {
    if (!this.loaded) {
      this.loadSpells();
    }
  }

  loadSpells() {
    const id = this.data._id.$oid;
    this.hbService.getTome(id)
      .subscribe(tome => {
        this.data = tome;
        this.loaded = true;
      });
  }

  copy(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  beginJSONExport() {
    // TODO
  }

  beginMDExport() {
    // TODO
  }

}
