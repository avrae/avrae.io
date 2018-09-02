import {Component, Input, OnInit} from '@angular/core';
import {Alias} from "../../../schemas/Customization";
import {MatDialog, MatSnackBar} from "@angular/material";
import {ConfirmDeleteDialog} from "../confirm-delete-dialog/confirm-delete-dialog.component";
import {CustomizationService} from "../customization.service";

@Component({
  selector: 'avr-alias-list',
  templateUrl: './alias-list.component.html',
  styleUrls: ['./alias-list.component.css']
})
export class AliasListComponent implements OnInit {

  @Input() data: Alias[];

  columnsToDisplay: string[] = ["name", "commands", "buttons"];

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private custService: CustomizationService) {
  }

  ngOnInit() {
  }

  refresh() {
    this.custService.getAliases()
      .subscribe(aliases => this.data = aliases);
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

  delete(alias: Alias) {
    // HTTP DELETE /customizations/aliases/:name
    this.custService.deleteAlias(alias)
      .subscribe(result => {
        this.refresh();
        this.snackBar.open(result);
      });
  }
}
