import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {WorkshopService} from '../../workshop.service';

@Component({
  selector: 'avr-new-collection-dialog',
  templateUrl: './new-collection-dialog.component.html',
  styleUrls: ['./new-collection-dialog.component.css']
})
export class NewCollectionDialogComponent implements OnInit {

  name: string;
  description: string;
  imageUrl: string;

  error: string;
  loading = false;

  constructor(private dialogRef: MatDialogRef<NewCollectionDialogComponent>,
              private workshopService: WorkshopService) {
  }

  ngOnInit(): void {
  }

  // event handlers
  onCreate() {
    this.loading = true;
    this.workshopService.createCollection(this.name, this.description, this.imageUrl || null)
      .subscribe(response => {
        this.loading = false;
        if (response.success) {
          this.dialogRef.close(response.data);
        } else {
          this.error = response.error;
        }
      });
  }
}
