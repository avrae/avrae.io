import {Component, Input, OnInit} from '@angular/core';
import {Snippet} from '../../../schemas/Customization';
import {MatDialog, MatSnackBar} from '@angular/material';
import {CustomizationService} from '../customization.service';
import {NewDialog} from '../../new-dialog/new-dialog.component';
import {EditDialog} from '../../edit-dialog/edit-dialog.component';
import {ConfirmDeleteDialog} from '../../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'avr-snippet-list',
  templateUrl: './snippet-list.component.html',
  styleUrls: ['./snippet-list.component.css']
})
export class SnippetListComponent implements OnInit {

  @Input() data: Snippet[];

  columnsToDisplay: string[] = ['name', 'snippet', 'buttons'];

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private custService: CustomizationService) {
  }

  ngOnInit() {
  }

  refresh() {
    this.custService.getSnippets()
      .subscribe(snippets => this.data = snippets);
  }

  beginNew() {
    const dialogRef = this.dialog.open(NewDialog, {
      data: {showName: true, type: 'snippet'},
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!result.name || !result.value) {
          this.snackBar.open('Name or value cannot be empty.');
          return;
        }
        let data = {name: result.name, snippet: result.value};
        if (data.name.includes(' ')) {
          this.snackBar.open('Name cannot contain whitespace.');
          return;
        }
        if (data.name.length < 2) {
          this.snackBar.open('Name must be at least 2 characters.');
          return;
        }
        this.post(data);
      }
    });
  }

  beginEdit(snippet: Snippet) {
    const dialogRef = this.dialog.open(EditDialog, {
      data: {name: snippet.name, content: snippet.snippet},
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        snippet.snippet = result;
        this.post(snippet);
      }
    });
  }

  confirmDelete(snippet: Snippet) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, {
      data: {name: snippet.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(snippet);
      }
    });
  }

  post(snippet: { name: string, snippet: string }) {
    // HTTP POST /customizations/snippets/:name
    this.custService.updateSnippet(snippet)
      .subscribe(result => {
        this.refresh();
        this.snackBar.open(result);
      });
  }

  delete(snippet: Snippet) {
    // HTTP DELETE /customizations/snippets/:name
    this.custService.deleteSnippet(snippet)
      .subscribe(result => {
        this.refresh();
        this.snackBar.open(result);
      });
  }

}
