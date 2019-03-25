import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Spell} from '../../../../../../../schemas/homebrew/spell.model';
import {Damage, Roll} from '../../../../../../../schemas/homebrew/SpellEffects';

const range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);

@Component({
  selector: 'avr-higher-level',
  template: `
    <div *ngIf="parent.higher != undefined">
      <mat-expansion-panel class="higher-level-panel">
        <mat-expansion-panel-header>
          <mat-panel-title>
            At Higher Levels
          </mat-panel-title>
        </mat-expansion-panel-header>
        <div fxLayout="column">
          <mat-form-field fxFlex *ngFor="let level of possibleLevels">
            <input matInput placeholder="Level {{level}}" (change)="changed.emit()" [(ngModel)]="parent.higher[level]">
          </mat-form-field>
        </div>
      </mat-expansion-panel>
    </div>

    <div *ngIf="parent.higher === undefined">
      <button mat-stroked-button (click)="addHigher()">Add Higher Level</button>
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
  }

  addHigher() {
    this.parent.higher = new Map<number, string>();
    this.changed.emit();
  }

  ngOnInit() {
    this.calcLevels();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.calcLevels();
  }
}
