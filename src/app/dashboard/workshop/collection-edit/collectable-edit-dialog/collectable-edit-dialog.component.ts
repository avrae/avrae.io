import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {
  CodeVersion,
  PublicationState,
  WorkshopAliasFull,
  WorkshopCollectable,
  WorkshopCollectionFull,
  WorkshopSnippet
} from '../../../../schemas/Workshop';
import {ConfirmDeleteDialog} from '../../../confirm-delete-dialog/confirm-delete-dialog.component';
import {WorkshopService} from '../../workshop.service';

interface CollectableEditDialogComponentData {
  collection: WorkshopCollectionFull;
  alias: WorkshopAliasFull;
  parent: WorkshopAliasFull;
  snippet: WorkshopSnippet;
}

@Component({
  selector: 'avr-collectable-edit-dialog',
  templateUrl: './collectable-edit-dialog.component.html',
  styleUrls: ['./collectable-edit-dialog.component.scss', '../../dialog-common.scss', '../../common.scss']
})
export class CollectableEditDialogComponent implements OnInit {
  PublicationState = PublicationState;
  editorOptions = {theme: 'vs-dark', language: 'python', scrollBeyondLastLine: false};
  readonlyEditorOptions = {...this.editorOptions, readOnly: true};

  // data
  collection: WorkshopCollectionFull; // root collection
  alias: WorkshopAliasFull;           // mutex snippet
  parent: WorkshopAliasFull;          // the parent of this alias, if applicable
  snippet: WorkshopSnippet;           // mutex alias

  // new values
  name: string;
  docs: string;
  selectedCodeVersion: CodeVersion;
  creatingNewCodeVersion: boolean;
  newCodeVersionContent: string;

  // state
  loading = false;
  error: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: CollectableEditDialogComponentData,
              private dialogRef: MatDialogRef<CollectableEditDialogComponent>,
              private workshopService: WorkshopService, private dialog: MatDialog) {
    this.collection = data.collection;
    this.alias = data.alias;
    this.parent = data.parent;
    this.snippet = data.snippet;
    this.name = this.collectable.name;
    this.docs = this.collectable.docs;
    this.selectedCodeVersion = this.collectable.versions.length ? this.collectable.versions.find(cv => cv.is_current) : null;
  }

  ngOnInit(): void {
  }

  get collectable(): WorkshopCollectable {
    return this.alias || this.snippet;
  }

  // event handlers
  onSave() {
    if (this.name !== this.collectable.name
      || this.docs !== this.collectable.docs) {
      this.error = null;
      this.loading = true;
      const request = this.alias
        ? this.workshopService.editAlias(this.alias._id, this.name, this.docs)
        : this.workshopService.editSnippet(this.snippet._id, this.name, this.docs);
      request.subscribe(response => {
        this.loading = false;
        if (response.success) {
          this.dialogRef.close(response.data);
        } else {
          this.error = response.error;
        }
      });
    } else {
      this.dialogRef.close(this.collectable);
    }
  }

  onDelete() {
    // confirm delete
    const dialogRef: MatDialogRef<ConfirmDeleteDialog, boolean> = this.dialog.open(
      ConfirmDeleteDialog,
      {data: {name: this.collectable.name}}
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.error = null;
        this.loading = true;
        // do the delete
        const request = this.alias
          ? this.workshopService.deleteAlias(this.alias._id)
          : this.workshopService.deleteSnippet(this.snippet._id);
        request.subscribe(response => {
          this.loading = false;
          if (response.success) {
            // remove this from parent or collection
            if (this.parent) {
              this.parent.subcommands.splice(this.parent.subcommands.indexOf(this.alias), 1);
            } else if (this.alias) {
              this.collection.aliases.splice(this.collection.aliases.indexOf(this.alias), 1);
            } else if (this.snippet) {
              this.collection.snippets.splice(this.collection.snippets.indexOf(this.snippet), 1);
            }
            this.dialogRef.close();
          } else {
            this.error = response.error;
          }
        });
      }
    });
  }

  onViewCodeVersion(codeVersion: CodeVersion) {
    this.selectedCodeVersion = codeVersion;
    this.creatingNewCodeVersion = false;
  }

  onStartCreatingCodeVersion() {
    if (this.creatingNewCodeVersion) {
      return;
    }
    this.selectedCodeVersion = null;
    this.creatingNewCodeVersion = true;
    this.newCodeVersionContent = this.newCodeVersionContent || '';
  }

  onSaveNewCodeVersion() {

  }

  onSetCurrentAsActive() {

  }

  // helpers
  getSortedVersions() {
    return this.collectable.versions.sort((a, b) => b.version - a.version);
  }
}
