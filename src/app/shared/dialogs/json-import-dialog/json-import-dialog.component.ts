import {HttpClient} from '@angular/common/http';
import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';

@Component({
  selector: 'avr-json-import-dialog',
  templateUrl: './json-import-dialog.component.html',
  styleUrls: ['./json-import-dialog.component.css']
})
export class JSONImportDialog implements OnInit {

  data: string;
  error: string;
  loading = false;

  constructor(private dialogRef: MatDialogRef<JSONImportDialog>,
              @Inject(MAT_DIALOG_DATA) public input: {
                validator: (data: object) => void
              }) {
  }

  ngOnInit() {
  }

  validateAndExit() {
    this.loading = true;
    this.error = null;

    let parsed;
    try {
      parsed = JSON.parse(this.data);
    } catch (e) {
      this.error = 'Invalid data format';
      this.loading = false;
      return;
    }

    if (this.input.validator) {
      this.input.validator(parsed);
    } else {
      this.dialogRef.close(JSON.parse(this.data));
    }
  }
}
