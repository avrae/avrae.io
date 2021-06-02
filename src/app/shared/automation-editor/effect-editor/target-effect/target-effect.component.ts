import {Component, OnInit} from '@angular/core';
import {Target} from '../../../../schemas/homebrew/AutomationEffects';
import {EffectComponent} from '../shared/EffectComponent';

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
          <mat-option [value]="targetPosInput.value" (click)="effect.target=1">Position</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field [ngClass]="!isNumber(effect.target) ? 'hidden' : ''">
        <input matInput placeholder="Target Position" type="number" [value]="effect.target" #targetPosInput
               (change)="onTargetPosChange(targetPosInput)" min="1">
      </mat-form-field>
    </div>
    <avr-effect-editor [parent]="effect.effects"
                       [parentTypeStack]="newParentTypeStack"
                       [spell]="spell"
                       (changed)="changed.emit()">
    </avr-effect-editor>
    <avr-new-effect-card [metaParent]="effect.meta"
                         [parent]="effect.effects"
                         [parentTypeStack]="newParentTypeStack"
                         (changed)="changed.emit()">
    </avr-new-effect-card>
  `,
  styleUrls: ['../effect-editor.component.css']
})
export class TargetEffectComponent extends EffectComponent<Target> implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }

  isNumber(val) {
    return typeof val === 'number';
  }

  onTargetPosChange(targetPosInput) {
    this.changed.emit();
    this.effect.target = +targetPosInput.value;
  }

}
