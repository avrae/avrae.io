import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'avr-spell-panel-description',
  template: `
    <mat-panel-description>{{description}}</mat-panel-description>`
})
export class SpellPanelDescriptionComponent implements OnInit, OnChanges {

  @Input() level: number;
  @Input() school: string;

  description: string;

  constructor() {
  }

  parseLevel() {
    if (this.level == 0) return "Cantrip";
    else if (this.level == 1) return "1st level";
    else if (this.level == 2) return "2nd level";
    else if (this.level == 3) return "3rd level";
    return `${this.level}th level`;
  }

  parseSchool() {
    if (this.school == "A") return "Abjuration";
    else if (this.school == "V") return "Evocation";
    else if (this.school == "E") return "Enchantment";
    else if (this.school == "I") return "Illusion";
    else if (this.school == "D") return "Divination";
    else if (this.school == "N") return "Necromancy";
    else if (this.school == "T") return "Transmutation";
    else if (this.school == "C") return "Conjuration";
    return this.school;
  }

  genDesc() {
    this.description = this.level ?
      `${this.parseLevel()} ${this.parseSchool()}` : `${this.parseSchool()} ${this.parseLevel()}`;
  }

  ngOnInit() {
    this.genDesc();
  }

  ngOnChanges(changes) {
    this.genDesc();
  }

}
