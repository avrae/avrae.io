import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Item} from '../../../../../schemas/homebrew/Items';
import {JSONExportDialog} from '../../../../../shared/dialogs/json-export-dialog/json-export-dialog.component';

@Component({
  selector: 'avr-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  @Input() item: Item;
  @Input() isFirst: boolean;
  @Input() isLast: boolean;
  @Output() moveUp = new EventEmitter();
  @Output() moveDown = new EventEmitter();
  @Output() changed = new EventEmitter();
  @Output() opened = new EventEmitter();
  @Output() delete = new EventEmitter();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  emitChange() {
    this.changed.emit();
  }

  beginJSONExport() {
    this.dialog.open(JSONExportDialog, {
      data: {name: this.item.name, data: this.item},
      width: '60%'
    });
  }

}
