import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Spell} from "../../../../../schemas/homebrew/Spells";
import {UserInfo} from "../../../../../schemas/UserInfo";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'avr-spell-list',
  templateUrl: './spell-list.component.html',
  styleUrls: ['./spell-list.component.css']
})
export class SpellListComponent implements OnInit {

  @Input() spells: Spell[];
  @Input() user: UserInfo;
  @Output() selected = new EventEmitter();
  @Output() changed = new EventEmitter();

  selectedSpell: Spell;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  select(spell: Spell) {
    this.selectedSpell = spell;
    this.selected.emit(spell);
  }

  newSpell() {
    this.spells.push(new Spell());
    this.changed.emit();
  }

  // beginNewFromJSON() { // TODO
  //   const dialogRef = this.dialog.open(TomeJSONImportDialog, {
  //     width: "60%",
  //     disableClose: true
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       let spell: Spell | Spell[] = result;
  //       console.log(spell);
  //       if (spell instanceof Array) {
  //         this.spells.push(...spell);
  //       } else {
  //         this.spells.push(spell);
  //       }
  //       this.changed.emit();
  //     }
  //   });
  // }
  //
  // beginNewFromSRD() {
  //   const dialogRef = this.dialog.open(TomeSRDImportDialog, {
  //     width: "60%",
  //     disableClose: true
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       console.log(result);
  //       this.spells.push(result);
  //       this.changed.emit();
  //     }
  //   });
  // }

  deleteSpell(spell: Spell) {
    this.spells = this.spells.filter(obj => obj !== spell);
    this.changed.emit();
  }

}
