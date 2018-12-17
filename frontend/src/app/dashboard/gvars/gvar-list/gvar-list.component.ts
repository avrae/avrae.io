import {Component, Input, OnInit} from '@angular/core';
import {GlobalVar} from '../../../schemas/Customization';
import {MatDialog, MatSnackBar} from '@angular/material';
import {NewDialog} from '../../new-dialog/new-dialog.component';
import {EditDialog} from '../../edit-dialog/edit-dialog.component';
import {ConfirmDeleteDialog} from '../../confirm-delete-dialog/confirm-delete-dialog.component';
import {GvarService} from '../gvar.service';

@Component({
  selector: 'avr-gvar-list',
  templateUrl: './gvar-list.component.html',
  styleUrls: ['./gvar-list.component.css']
})
export class GvarListComponent implements OnInit {

  @Input() data: GlobalVar[];
  @Input() owned: boolean;

  columnsToDisplay: string[] = ['name', 'value', 'buttons'];

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private gvarService: GvarService) {
  }

  ngOnInit() {
  }

  refresh() {
    // HTTP GET /customizations/gvars/[owned|editable]
    this.gvarService.getGvars(this.owned)
      .subscribe(gvars => this.data = gvars);
  }

  beginNew() {
    const dialogRef = this.dialog.open(NewDialog, {
      data: {showName: false, type: 'gvar'},
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!result.value) {
          this.snackBar.open('Value cannot be empty.');
          return;
        }
        let data = {value: result.value};
        this.new(data);
      }
    });
  }

  beginEdit(gvar: GlobalVar) {
    const dialogRef = this.dialog.open(EditDialog, {
      data: {name: gvar.key, content: gvar.value},
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        gvar.value = result;
        this.post(gvar);
      }
    });
  }

  confirmDelete(gvar: GlobalVar) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, {
      data: {name: gvar.key}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(gvar);
      }
    });
  }

  new(gvar: { value: string }) {
    // HTTP POST /customizations/gvars
    this.gvarService.newGvar(gvar)
      .subscribe(result => {
        this.refresh();
        this.snackBar.open(result);
      });
  }

  post(gvar: GlobalVar) {
    // HTTP POST /customizations/gvars/:key
    this.gvarService.updateGvar(gvar)
      .subscribe(result => {
        this.refresh();
        this.snackBar.open(result);
      });
  }

  delete(gvar: GlobalVar) {
    // HTTP DELETE /customizations/gvars/:key
    this.gvarService.deleteGvar(gvar)
      .subscribe(result => {
        this.refresh();
        this.snackBar.open(result);
      });
  }

}
