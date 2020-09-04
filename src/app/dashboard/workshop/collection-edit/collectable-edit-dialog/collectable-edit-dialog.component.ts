import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {
  CodeVersion,
  PublicationState,
  WorkshopAliasFull,
  WorkshopCollectable,
  WorkshopCollectionFull,
  WorkshopSnippet
} from '../../../../schemas/Workshop';
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

  // data
  collection: WorkshopCollectionFull; // root collection
  alias: WorkshopAliasFull;           // mutex snippet
  parent: WorkshopAliasFull;          // the parent of this alias, if applicable
  snippet: WorkshopSnippet;           // mutex alias

  // new values
  name: string;
  docs: string;
  selectedCodeVersion: CodeVersion;

  // state
  loading = false;
  error: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: CollectableEditDialogComponentData,
              private dialogRef: MatDialogRef<CollectableEditDialogComponent>,
              private workshopService: WorkshopService) {
    this.collection = data.collection;
    this.alias = data.alias;
    this.parent = data.parent;
    this.snippet = data.snippet;
    this.name = this.collectable.name;
    this.docs = this.collectable.docs;
  }

  ngOnInit(): void {
  }

  get collectable(): WorkshopCollectable {
    return this.alias || this.snippet;
  }

  // event handlers
  onSave() {

  }

  onDelete() {

  }

  onViewCodeVersion(codeVersion: CodeVersion) {

  }

  onCreateCodeVersion(content: string) {

  }

  // helpers
}
