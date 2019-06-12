import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from '../../../../../schemas/homebrew/Items';
import {PackJsonDialog} from '../../pack-json-dialog/pack-json-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'avr-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  @Input() item: Item;
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
    this.dialog.open(PackJsonDialog, {
      data: {name: this.item.name, data: this.item},
      width: '60%'
    });
  }

}
