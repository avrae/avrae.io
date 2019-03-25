import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Target} from '../../../../../../../schemas/homebrew/SpellEffects';
import {Spell} from '../../../../../../../schemas/homebrew/spell.model';

@Component({
  selector: 'avr-target-effect',
  template: `
    <div fxLayout="row" fxLayoutGap="6px">
      <mat-form-field>
        <mat-label>Target</mat-label>
        <mat-select [(value)]="effect.target" (selectionChange)="changed.emit()">
          <mat-option value="all">All (usually saves)</mat-option>
          <mat-option value="each">Each (usually attacks)</mat-option>
          <mat-option value="self">Caster</mat-option>
          <mat-option [value]="targetPosInput.value*1">Position</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field [ngClass]="!isNumber(effect.target) ? 'hidden' : ''">
        <input matInput placeholder="Target Position" type="number" value="1" #targetPosInput
               (change)="changed.emit()">
      </mat-form-field>
    </div>
    <avr-effect-editor [parent]="effect.effects" [spell]="spell" (changed)="changed.emit()"></avr-effect-editor>
    <avr-new-effect-card [metaParent]="effect.meta" [parent]="effect.effects"
                         [parentType]="effect.type" (changed)="changed.emit()"></avr-new-effect-card>
  `,
  styleUrls: ['../effect-editor.component.css']
})
export class TargetEffectComponent implements OnInit {

  @Input() effect: Target;
  @Input() spell: Spell;
  @Output() changed = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  isNumber(val) {
    return typeof val === 'number';
  }

}
