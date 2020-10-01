import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {forkJoin} from 'rxjs';
import {map} from 'rxjs/operators';
import {PublicationState, WorkshopCollection, WorkshopCollectionFull} from '../../../../schemas/Workshop';
import {ApiResponse} from '../../../APIHelper';
import {ConfirmDeleteDialog} from '../../../confirm-delete-dialog/confirm-delete-dialog.component';
import {WorkshopService} from '../../workshop.service';

@Component({
  selector: 'avr-edit-settings-dialog',
  templateUrl: './edit-settings-dialog.component.html',
  styleUrls: ['../../dialog-common.scss', '../../common.scss']
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
              private dialog: MatDialog, private router: Router,
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
    // if we have nothing to do, just close
    if (!requests.length) {
      this.dialogRef.close();
      return;
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
    const dialogRef: MatDialogRef<ConfirmDeleteDialog, boolean> = this.dialog.open(
      ConfirmDeleteDialog,
      {
        data: {
          name: this.collection.name,
          message: 'Deleting this collection will remove it from all subscribers\' collections and all servers. This is not reversible.'
        }
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.error = null;
        this.loading = true;
        // do the delete
        this.workshopService.deleteCollection(this.collection._id)
          .subscribe(response => {
            this.loading = false;
            if (response.success) {
              this.dialogRef.close();
              this.router.navigate(['/dashboard/workshop/my-work']);
            } else {
              this.error = response.error;
            }
          });
      }
    });
  }
}
