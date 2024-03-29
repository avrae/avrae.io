import {moveItemInArray} from '@angular/cdk/drag-drop';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {map} from 'rxjs/operators';
import {Spell, Tome} from '../../../../../schemas/homebrew/Spells';
import {UserInfo} from '../../../../../schemas/UserInfo';
import {JSONImportDialog} from '../../../../../shared/dialogs/json-import-dialog/json-import-dialog.component';
import {SRDCopyDialog} from '../../../../../shared/dialogs/srd-copy-dialog/srd-copy-dialog.component';
import {HomebrewService} from '../../../homebrew.service';

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

  constructor(private dialog: MatDialog, private hbService: HomebrewService) {
  }

  ngOnInit() {
  }

  newSpell() {
    this.tome.spells.push(new Spell());
    this.changed.emit();
  }

  newFromJSON() {

    const dialogRef = this.dialog.open(JSONImportDialog, {
      width: '60%',
      disableClose: true,
      data: {validator: (data) => this.validateSpellJSON(dialogRef, data)}
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
    const dialogRef = this.dialog.open(SRDCopyDialog, {
      width: '60%',
      disableClose: true,
      data: {getter: () => this.hbService.getTemplateSpells().pipe(map(value => value.data)), namer: a => a.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tome.spells.push(result);
        this.changed.emit();
      }
    });
  }

  deleteSpell(spell: Spell) {
    this.tome.spells = this.tome.spells.filter(obj => obj !== spell);
    this.changed.emit();
  }

  // spell import validation
  validateSpellJSON(dialogRef: MatDialogRef<JSONImportDialog>, data) {
    this.hbService.validateSpellJSON(data)
      .subscribe(
        result => {
          dialogRef.componentInstance.loading = false;
          if (result.success) {
            dialogRef.close(data);
          } else {
            dialogRef.componentInstance.error = result.error;
          }
        }
      );
  }

  // move items in list
  moveUp(spell: Spell) {
    const index = this.tome.spells.indexOf(spell);
    const newIndex = index - 1;
    if (newIndex > -1) {
      moveItemInArray(this.tome.spells, index, newIndex);
      this.changed.emit();
    }
  }

  moveDown(spell: Spell) {
    const index = this.tome.spells.indexOf(spell);
    const newIndex = index + 1;
    if (newIndex < this.tome.spells.length) {
      moveItemInArray(this.tome.spells, index, newIndex);
      this.changed.emit();
    }
  }
}
