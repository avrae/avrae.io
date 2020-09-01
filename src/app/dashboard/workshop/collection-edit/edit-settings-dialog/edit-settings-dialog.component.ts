import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {forkJoin} from 'rxjs';
import {map} from 'rxjs/operators';
import {PublicationState, WorkshopCollection, WorkshopCollectionFull} from '../../../../schemas/Workshop';
import {ApiResponse} from '../../../APIHelper';
import {WorkshopService} from '../../workshop.service';

@Component({
  selector: 'avr-edit-settings-dialog',
  templateUrl: './edit-settings-dialog.component.html',
  styleUrls: ['./edit-settings-dialog.component.css', '../../common.scss']
})
export class EditSettingsDialogComponent implements OnInit {
  PublicationState = PublicationState;

  collection: WorkshopCollectionFull;
  name: string;
  description: string;
  imageUrl: string | null;
  publishState: PublicationState;

  error: string;
  loading = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { collection: WorkshopCollectionFull },
              private dialogRef: MatDialogRef<EditSettingsDialogComponent>,
              private workshopService: WorkshopService) {
    this.collection = data.collection;
    // make copies of this data
    this.name = data.collection.name;
    this.description = data.collection.description;
    this.imageUrl = data.collection.image;
    this.publishState = data.collection.publish_state;
  }

  ngOnInit(): void {
  }

  // event handlers
  onSaveAndExit() {
    this.error = null;
    this.loading = true;
    // build the requests we want to run in parallel
    let finalCollection;
    let requests = [];
    if (this.name !== this.collection.name
      || this.description !== this.collection.description
      || this.imageUrl !== this.collection.image) {
      requests.push(this.workshopService.editCollection(this.collection._id, this.name, this.description, this.imageUrl)
        .pipe(map(response => {
          // build a new collection from the 2 responses
          if (response.success && !finalCollection) {
            finalCollection = response.data;
          } else if (response.success) {
            finalCollection = {
              ...finalCollection,
              name: response.data.name,
              description: response.data.description,
              image: response.data.image
            };
          }
          return response;
        })));
    }
    if (this.publishState !== this.collection.publish_state) {
      requests.push(this.workshopService.editCollectionState(this.collection._id, this.publishState)
        .pipe(map(response => {
          if (response.success && !finalCollection) {
            finalCollection = response.data;
          } else if (response.success) {
            finalCollection = {...finalCollection, publish_state: response.data.publish_state};
          }
          return response;
        })));
    }
    // run them
    forkJoin(requests).subscribe((responses: ApiResponse<WorkshopCollection>[]) => {
      this.loading = false;
      if (responses.every(response => response.success)) {
        this.dialogRef.close(finalCollection);
      } else {
        this.error = responses.filter(response => response.error).map(response => response.error).join('\n\n');
      }
    });
  }

  onDelete() {
    // todo
  }
}