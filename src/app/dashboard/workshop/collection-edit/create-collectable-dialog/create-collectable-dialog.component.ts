import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PublicationState, WorkshopAliasFull, WorkshopCollectionFull, WorkshopSnippet} from '../../../../schemas/Workshop';
import {ApiResponse} from '../../../APIHelper';
import {WorkshopService} from '../../workshop.service';

interface CreateCollectableDialogComponentData {
  collection: WorkshopCollectionFull;
  parent?: WorkshopAliasFull | null;
  collectableType: 'alias' | 'snippet' | 'subalias';
}

@Component({
  selector: 'avr-create-collectable-dialog',
  templateUrl: './create-collectable-dialog.component.html',
  styleUrls: ['../../dialog-common.scss']
})
export class CreateCollectableDialogComponent implements OnInit {
  PublicationState = PublicationState;

  collectableType: 'alias' | 'snippet' | 'subalias';
  collection: WorkshopCollectionFull;
  parent: WorkshopAliasFull | null;

  name: string;
  docs: string;

  error: string;
  loading = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: CreateCollectableDialogComponentData,
              private dialogRef: MatDialogRef<CreateCollectableDialogComponent>,
              private workshopService: WorkshopService) {
    this.collection = data.collection;
    this.parent = data.parent;
    this.collectableType = data.collectableType;
  }

  ngOnInit(): void {
  }

  // event handlers
  onCreate() {
    this.loading = true;
    switch (this.collectableType) {
      case 'alias':
        return this.onCreateAlias();
      case 'snippet':
        return this.onCreateSnippet();
      case 'subalias':
        return this.onCreateSubalias();
      default:
        this.error = 'Unknown collectable type (this is a bug)';
        this.loading = false;
    }
  }

  onCreateAlias() {
    this.workshopService.createAlias(this.collection._id, this.name, this.docs)
      .subscribe(response => this.handleCreateResponse(response));
  }

  onCreateSnippet() {
    this.workshopService.createSnippet(this.collection._id, this.name, this.docs)
      .subscribe(response => this.handleCreateResponse(response));
  }

  onCreateSubalias() {
    if (!this.parent) {
      this.error = 'You are not in an alias context (this is a bug)';
      this.loading = false;
    }
    this.workshopService.createSubalias(this.parent._id, this.name, this.docs)
      .subscribe(response => this.handleCreateResponse(response));
  }

  // helpers
  handleCreateResponse(response: ApiResponse<WorkshopAliasFull | WorkshopSnippet>) {
    this.loading = false;
    if (response.success) {
      this.dialogRef.close(response.data);
    } else {
      this.error = response.error;
    }
  }
}
