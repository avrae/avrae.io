import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Spell, SPELL_SCHOOLS} from '../../../../../schemas/homebrew/Spells';
import {UserInfo} from '../../../../../schemas/UserInfo';
import {JSONExportDialog} from '../../../../../shared/dialogs/json-export-dialog/json-export-dialog.component';

@Component({
  selector: 'avr-spell-detail',
  templateUrl: './spell-detail.component.html',
  styleUrls: ['./spell-detail.component.css']
})
export class SpellDetailComponent implements OnInit {

  @Input() spell: Spell;
  @Input() isFirst: boolean;
  @Input() isLast: boolean;
  @Output() moveUp = new EventEmitter();
  @Output() moveDown = new EventEmitter();
  @Output() changed = new EventEmitter();
  @Output() opened = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() moveToEditor = new EventEmitter();

  customSpellSchool: boolean;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    this.customSpellSchool = !SPELL_SCHOOLS.includes(this.spell.school);
  }

  emitChange() {
    this.changed.emit();
  }

  beginJSONExport() {
    this.dialog.open(JSONExportDialog, {
      data: {name: this.spell.name, data: this.spell},
      width: '60%'
    });
  }

}
