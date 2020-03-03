import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';

class SRDDialogData<T> {
  getter: () => Observable<T[]>;
  namer: (obj: T) => string;
}

@Component({
  selector: 'avr-srd-copy-dialog',
  templateUrl: './srd-copy-dialog.component.html'
})
export class SRDCopyDialog<T> implements OnInit {

  search = '';
  templates: T[];
  filteredTemplates: T[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: SRDDialogData<T>,
              private dialogRef: MatDialogRef<SRDCopyDialog<T>>) {
  }

  ngOnInit() {
    this.getTemplates();
  }

  select(obj: T) {
    this.dialogRef.close(obj);
  }

  filterTemplates() {
    this.filteredTemplates = this.templates.filter(
      obj => this.data.namer(obj).toLowerCase().includes(this.search.toLowerCase())
    );
  }

  getTemplates() {
    this.data.getter()
      .subscribe(objs => {
        this.templates = objs;
        this.filterTemplates();
      });
  }

}
