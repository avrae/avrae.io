import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Pack} from '../../../../schemas/homebrew/item.model';
import {PackDeleteDialog} from '../pack-delete-dialog/pack-delete-dialog.component';
import {getUser} from '../../../APIHelper';

@Component({
  selector: 'avr-pack-options-dialog',
  templateUrl: './pack-options-dialog.component.html',
  styleUrls: ['./pack-options-dialog.component.css']
})
export class PackOptionsDialog implements OnInit {

  name: string;
  image: string;
  desc: string;
  isOwner: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Pack, private dialog: MatDialog,
              private dialogRef: MatDialogRef<PackOptionsDialog>) {
    this.name = data.name;
    this.image = data.image;
    this.desc = data.desc;
    this.isOwner = getUser().id === data.owner.id;
  }

  ngOnInit() {
  }

  beginDelete() {
    const dialogRef = this.dialog.open(PackDeleteDialog, {
      data: this.data,
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close({delete: true});
      }
    });
  }

}
