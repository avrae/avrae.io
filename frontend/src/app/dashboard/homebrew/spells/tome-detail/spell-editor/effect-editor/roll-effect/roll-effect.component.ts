import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Roll} from '../../../../../../../schemas/homebrew/SpellEffects';
import {Spell} from '../../../../../../../schemas/homebrew/Spells';

@Component({
  selector: 'avr-roll-effect',
  template: `
    <div fxLayout="row" fxLayoutGap="4px" fxLayoutAlign="left center">
      <mat-form-field>
        <input matInput placeholder="Name" (change)="changed.emit()" [(ngModel)]="effect.name">
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Dice" (change)="changed.emit()" [(ngModel)]="effect.dice">
      </mat-form-field>
      <avr-higher-level [parent]="effect" [spell]="spell" (changed)="changed.emit()"></avr-higher-level>
      <mat-checkbox [(ngModel)]="effect.cantripScale" (change)="changed.emit()">
        Scales like Cantrip
      </mat-checkbox>
      <mat-checkbox [(ngModel)]="effect.hidden" (change)="changed.emit()">
        Hidden
      </mat-checkbox>
    </div>
  `,
  styleUrls: ['../effect-editor.component.css']
})
export class RollEffectComponent implements OnInit {

  @Input() effect: Roll;
  @Input() spell: Spell;
  @Output() changed = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
