import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Spell} from '../../../../../../../schemas/homebrew/Spells';
import {Damage, Roll} from '../../../../../../../schemas/homebrew/SpellEffects';

const range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);

@Component({
  selector: 'avr-higher-level',
  template: `
    <div *ngIf="parent.higher != undefined" fxLayout="column">
      <div fxFlex>
        At Higher Levels
      </div>
      <mat-form-field fxFlex *ngFor="let level of possibleLevels">
        <input matInput placeholder="Level {{level}}" (change)="changed.emit()" [(ngModel)]="parent.higher[level]">
      </mat-form-field>
    </div>

    <div *ngIf="parent.higher === undefined">
      Add higher level
    </div>
  `,
  styleUrls: ['../effect-editor.component.css']
})
export class HigherLevelComponent implements OnInit, OnChanges {

  @Input() parent: Damage | Roll;
  @Input() spell: Spell;
  @Output() changed = new EventEmitter();

  undefined = undefined;
  possibleLevels: number[] = [];


  constructor() {
  }

  calcLevels() {
    this.possibleLevels = range(this.spell.level + 1, 10);
    console.log(this.possibleLevels);
  }

  ngOnInit() {
    this.calcLevels();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.calcLevels();
  }
}
