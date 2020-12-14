import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PublicationState, WorkshopCollection} from '../../../../schemas/Workshop';
import {WorkshopService} from '../../workshop.service';

const PUBLISH_STEPS = [
  `I understand that after publishing this collection, I <b>cannot delete or unpublish</b> it or any item contained in it.`,
  `If any item in this collection uses rules or data that is not in the System Reference Document, I have added the required license(s) to that item.`,
  `Aside from any data which I have added the license to use, I and/or this collection's editors am/are the sole owner(s) of the content in this collection.`,
  `The code contained in this collection is for anyone to use, and <b>not intended for one specific Discord server</b>.`,
  `I agree to the <a href="https://github.com/avrae/.github/blob/master/community/alias-workshop-rules.md" target="_blank">Alias Workshop Rules & Guidelines</a>.`
];

@Component({
  selector: 'avr-publish-dialog',
  templateUrl: './publish-dialog.component.html',
  styleUrls: ['../../dialog-common.scss', './publish-dialog.component.css']
})
export class PublishDialogComponent implements OnInit {
  // exports
  PUBLISH_STEPS = PUBLISH_STEPS;

  collection: WorkshopCollection;
  agreed = new Array(PUBLISH_STEPS.length).fill(false);
  error: string;
  loading = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { collection: WorkshopCollection },
              private dialogRef: MatDialogRef<PublishDialogComponent>,
              private workshopService: WorkshopService) {
    this.collection = data.collection;
  }

  ngOnInit(): void {
  }

  // event listeners
  onPublish() {
    this.loading = true;
    this.error = null;
    this.workshopService.editCollectionState(this.collection._id, PublicationState.PUBLISHED)
      .subscribe(response => {
        this.loading = false;
        if (response.success) {
          this.dialogRef.close(response.data);
        } else {
          this.error = response.error;
        }
      });
  }

  // helpers
  canPublish(): boolean {
    return this.agreed.every(a => a);
  }

}
