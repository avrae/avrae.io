import {Component, Input, OnInit} from '@angular/core';
import {UserVar} from "../../../schemas/Customization";
import {MatDialog, MatSnackBar} from "@angular/material";
import {CustomizationService} from "../customization.service";
import {NewDialog} from "../../new-dialog/new-dialog.component";
import {EditDialog} from "../../edit-dialog/edit-dialog.component";
import {ConfirmDeleteDialog} from "../../confirm-delete-dialog/confirm-delete-dialog.component";

@Component({
  selector: 'avr-uvar-list',
  templateUrl: './uvar-list.component.html',
  styleUrls: ['./uvar-list.component.css']
})
export class UvarListComponent implements OnInit {

  @Input() data: UserVar[];

  columnsToDisplay: string[] = ["name", "value", "buttons"];

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private custService: CustomizationService) {
  }

  ngOnInit() {
  }

  refresh() {
    this.custService.getUvars()
      .subscribe(uvars => this.data = uvars);
  }

  beginNew() {
    const dialogRef = this.dialog.open(NewDialog, {
      data: {showName: true, type: "uvar"},
      width: "60%"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!result.name || !result.value) {
          this.snackBar.open("Name or value cannot be empty.");
          return
        }
        let data = {name: result.name, value: result.value};
        this.post(data);
      }
    });
  }

  beginEdit(uvar: UserVar) {
    const dialogRef = this.dialog.open(EditDialog, {
      data: {name: uvar.name, content: uvar.value},
      width: "60%"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        uvar.value = result;
        this.post(uvar);
      }
    });
  }

  confirmDelete(uvar: UserVar) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, {
      data: {name: uvar.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(uvar);
      }
    });
  }

  post(uvar: { name: string, value: string }) {
    // HTTP POST /customizations/uvars/:name
    this.custService.updateUvar(uvar)
      .subscribe(result => {
        this.refresh();
        this.snackBar.open(result);
      });
  }

  delete(uvar: UserVar) {
    // HTTP DELETE /customizations/uvars/:name
    this.custService.deleteUvar(uvar)
      .subscribe(result => {
        this.refresh();
        this.snackBar.open(result);
      });
  }
}
