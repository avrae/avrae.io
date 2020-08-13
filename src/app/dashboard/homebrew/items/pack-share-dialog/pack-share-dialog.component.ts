import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {DiscordUser} from '../../../../schemas/Discord';
import {Pack} from '../../../../schemas/homebrew/Items';
import {UserInfo} from '../../../../schemas/UserInfo';
import {JSONExportDialog} from '../../../../shared/dialogs/json-export-dialog/json-export-dialog.component';
import {DiscordService} from '../../../../shared/discord.service';
import {HomebrewService} from '../../homebrew.service';
import {PackMarkdownDialog} from '../pack-markdown-dialog/pack-markdown-dialog.component';

@Component({
  selector: 'avr-pack-share-dialog',
  templateUrl: './pack-share-dialog.component.html',
  styleUrls: ['./pack-share-dialog.component.css']
})
export class PackShareDialog implements OnInit {

  public: boolean;
  shareLink: string;
  loaded: boolean;

  owner: Observable<DiscordUser>;
  editors: Observable<DiscordUser>[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: Pack, private dialog: MatDialog,
              private hbService: HomebrewService, private discord: DiscordService) {
    this.public = data.public;
    this.shareLink = `https://avrae.io/homebrew/items/${data._id.$oid}`;
    this.loaded = data.items !== undefined;
  }

  ngOnInit() {
    this.owner = this.discord.getUser(this.data.owner);
    this.loadEditors();
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

  loadEditors() {
    const id = this.data._id.$oid;
    this.hbService.getPackEditors(id)
      .subscribe(editors => {
        const out = [];
        editors.forEach(eid => out.push(this.discord.getUser(eid)));
        this.editors = out;
      });
  }

  copy(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  beginJSONExport() {
    this.dialog.open(JSONExportDialog, {
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
