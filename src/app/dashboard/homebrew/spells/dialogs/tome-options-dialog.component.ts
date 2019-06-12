import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {getUser} from '../../../APIHelper';
import {Tome} from '../../../../schemas/homebrew/Spells';
import {TomeDeleteDialog} from './tome-delete-dialog.component';

@Component({
  selector: 'avr-tome-options-dialog',
  templateUrl: './tome-options-dialog.component.html',
  styleUrls: ['./tome-options-dialog.component.css']
})
export class TomeOptionsDialog implements OnInit {

  name: string;
  image: string;
  desc: string;
  isOwner: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Tome, private dialog: MatDialog,
              private dialogRef: MatDialogRef<TomeOptionsDialog>) {
    this.name = data.name;
    this.image = data.image;
    this.desc = data.desc;
    this.isOwner = getUser().id === data.owner.id;
  }

  ngOnInit() {
  }

  beginDelete() {
    const dialogRef = this.dialog.open(TomeDeleteDialog, {
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
