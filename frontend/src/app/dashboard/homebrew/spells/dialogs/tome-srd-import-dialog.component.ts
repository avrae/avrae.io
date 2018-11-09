import {Component, OnInit} from '@angular/core';
import {Spell} from "../../../../schemas/homebrew/Spells";
import {HomebrewService} from "../../homebrew.service";
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'avr-tome-srd-import-dialog',
  templateUrl: './tome-srd-import-dialog.component.html',
  styleUrls: ['./tome-srd-import-dialog.component.css']
})
export class TomeSRDImportDialog implements OnInit {

  search: string = "";
  templateSpells: Spell[];
  filteredTemplateSpells: Spell[];

  constructor(private hbService: HomebrewService, private dialogRef: MatDialogRef<TomeSRDImportDialog>) {
  }

  ngOnInit() {
    this.getTemplateSpells();
  }

  select(spell: Spell) {
    this.dialogRef.close(spell);
  }

  filterSpells() {
    console.log(this.search);
    this.filteredTemplateSpells = this.templateSpells.filter(
      spell => spell.name.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  getTemplateSpells() {
    this.hbService.getTemplateSpells()
      .subscribe(spells => {
        this.templateSpells = spells;
        this.filterSpells();
      });
  }

}
