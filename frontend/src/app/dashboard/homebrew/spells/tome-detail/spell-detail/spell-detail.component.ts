import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Spell} from '../../../../../schemas/homebrew/Spells';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'avr-spell-detail',
  templateUrl: './spell-detail.component.html',
  styleUrls: ['./spell-detail.component.css']
})
export class SpellDetailComponent implements OnInit {

  @Input() spell: Spell;
  @Output() changed = new EventEmitter();
  @Output() opened = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() moveToEditor = new EventEmitter();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  emitChange() {
    this.changed.emit();
  }

  beginJSONExport() {
    // this.dialog.open(SpellJsonDialog, {
    //   data: {name: this.spell.name, data: this.spell},
    //   width: '60%'
    // });
  }

}
