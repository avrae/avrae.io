import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from "../../../../../schemas/homebrew/Items";

@Component({
  selector: 'avr-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  @Input() item: Item;
  @Output() changed = new EventEmitter();
  @Output() opened = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  emitChange() {
    this.changed.emit();
  }

}
