import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Spell, Tome} from '../../../../../schemas/homebrew/Spells';
import {UserInfo} from '../../../../../schemas/UserInfo';
import { MatDialog } from '@angular/material/dialog';
import {TomeSRDImportDialog} from '../../dialogs/tome-srd-import-dialog.component';
import {TomeJSONImportDialog} from '../../dialogs/tome-json-import-dialog/tome-json-import-dialog.component';

@Component({
  selector: 'avr-spell-list',
  templateUrl: './spell-list.component.html',
  styleUrls: ['./spell-list.component.scss']
})
export class SpellListComponent implements OnInit {

  @Input() tome: Tome;
  @Input() user: UserInfo;
  @Output() selected = new EventEmitter();
  @Output() changed = new EventEmitter();
  @Output() moveToEditor = new EventEmitter();

  selectedSpell: Spell;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  newSpell() {
    this.tome.spells.push(new Spell());
    this.changed.emit();
  }

  newFromJSON() {
    const dialogRef = this.dialog.open(TomeJSONImportDialog, {
      width: '60%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let spell: Spell | Spell[] = result;
        console.log(spell);
        if (spell instanceof Array) {
          this.tome.spells.push(...spell);
        } else {
          this.tome.spells.push(spell);
        }
        this.changed.emit();
      }
    });
  }

  newFromSRD() {
    const dialogRef = this.dialog.open(TomeSRDImportDialog, {
      width: '60%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.tome.spells.push(result);
        this.changed.emit();
      }
    });
  }

  deleteSpell(spell: Spell) {
    this.tome.spells = this.tome.spells.filter(obj => obj !== spell);
    this.changed.emit();
  }

}
