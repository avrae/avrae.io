import {Component, Input, OnInit} from '@angular/core';
import {Alias} from '../../../schemas/Customization';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ConfirmDeleteDialog} from '../../confirm-delete-dialog/confirm-delete-dialog.component';
import {CustomizationService} from '../customization.service';
import {EditDialog} from '../../edit-dialog/edit-dialog.component';
import {NewDialog} from '../../new-dialog/new-dialog.component';

@Component({
  selector: 'avr-alias-list',
  templateUrl: './alias-list.component.html',
  styleUrls: ['./alias-list.component.css']
})
export class AliasListComponent implements OnInit {

  @Input() data: Alias[];

  columnsToDisplay: string[] = ['name', 'commands', 'buttons'];

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private custService: CustomizationService) {
  }

  ngOnInit() {
  }

  refresh() {
    this.custService.getAliases()
      .subscribe(aliases => this.data = aliases);
  }

  beginNew() {
    const dialogRef = this.dialog.open(NewDialog, {
      data: {showName: true, type: 'alias'},
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!result.name || !result.value) {
          this.snackBar.open('Name or commands cannot be empty.');
          return;
        }
        let data = {name: result.name, commands: result.value};
        if (data.name.includes(' ')) {
          this.snackBar.open('Name cannot contain whitespace.');
          return;
        }
        this.post(data);
      }
    });
  }

  beginEdit(alias: Alias) {
    const dialogRef = this.dialog.open(EditDialog, {
      data: {name: alias.name, content: alias.commands},
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        alias.commands = result;
        this.post(alias);
      }
    });
  }

  confirmDelete(alias: Alias) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, {
      data: {name: alias.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(alias);
      }
    });
  }

  post(alias: { name: string, commands: string }) {
    // HTTP POST /customizations/aliases/:name
    this.custService.updateAlias(alias)
      .subscribe(result => {
        this.refresh();
        this.snackBar.open(result);
      });
  }

  delete(alias: Alias) {
    // HTTP DELETE /customizations/aliases/:name
    this.custService.deleteAlias(alias)
      .subscribe(result => {
        this.refresh();
        this.snackBar.open(result);
      });
  }
}
