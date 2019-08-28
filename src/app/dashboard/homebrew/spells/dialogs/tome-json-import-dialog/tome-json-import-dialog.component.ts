import {Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {HomebrewService} from '../../../homebrew.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'avr-tome-json-import-dialog',
  templateUrl: './tome-json-import-dialog.component.html',
  styleUrls: ['./tome-json-import-dialog.component.css']
})
export class TomeJSONImportDialog implements OnInit {

  data: string;
  error: string;
  loading = false;

  constructor(private dialogRef: MatDialogRef<TomeJSONImportDialog>, private hbService: HomebrewService) {
  }

  ngOnInit() {
  }

  validateAndExit() {
    this.loading = true;
    let parsed;
    try {
      parsed = JSON.parse(this.data);
    } catch (e) {
      this.error = 'Invalid data format';
      this.loading = false;
      return;
    }

    this.hbService.validateSpellJSON(parsed)
      .subscribe(
        result => this.onReply(result)
      );
  }

  onReply(result) {
    console.log(result);
    this.loading = false;
    if (result.success) {
      this.dialogRef.close(JSON.parse(this.data));
    } else {
      this.error = result.result;
    }
  }


}
