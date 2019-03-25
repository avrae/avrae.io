import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {parseLevel, parseSchool} from '../../../../../../schemas/homebrew/spell.model';

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


  genDesc() {
    this.description = this.level ?
      `${parseLevel(this.level)} ${parseSchool(this.school)}` : `${parseSchool(this.school)} ${parseLevel(this.level)}`;
  }

  ngOnInit() {
    this.genDesc();
  }

  ngOnChanges(changes) {
    this.genDesc();
  }

}
