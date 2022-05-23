import {Component, OnInit} from '@angular/core';
import {Condition} from '../../../../schemas/homebrew/AutomationEffects';
import {EffectComponent} from '../shared/EffectComponent';

@Component({
  selector: 'avr-condition-effect',
  template: `
    <div fxLayout="row" fxLayoutGap="4px" fxLayoutAlign="left center" class="auto-row">
      <mat-form-field>
        <input matInput placeholder="Condition" class="text-monospace" (change)="changed.emit()" [(ngModel)]="effect.condition" required>
        <mat-icon matSuffix matTooltip="IntExpression - variables and functions allowed, braces optional">calculate</mat-icon>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Error Behaviour</mat-label>
        <mat-select [(value)]="effect.errorBehaviour" (selectionChange)="changed.emit()">
          <mat-option value="true">Treat as True</mat-option>
          <mat-option value="false">Treat as False</mat-option>
          <mat-option value="both">Run Both</mat-option>
          <mat-option value="neither">Skip Effect</mat-option>
          <mat-option value="raise">Stop Execution</mat-option>
        </mat-select>
      </mat-form-field>
    </div>

    <mat-expansion-panel class="hoverable">
      <mat-expansion-panel-header>
        <mat-panel-title>
          On True
        </mat-panel-title>
      </mat-expansion-panel-header>
      <avr-effect-editor [parent]="effect.onTrue"
                         [parentTypeStack]="newParentTypeStack"
                         [spell]="spell"
                         (changed)="changed.emit()"></avr-effect-editor>
      <avr-new-effect-card [metaParent]="effect.meta"
                           [parent]="effect.onTrue"
                           [parentTypeStack]="newParentTypeStack"
                           (changed)="changed.emit()">
      </avr-new-effect-card>
    </mat-expansion-panel>

    <mat-expansion-panel class="hoverable">
      <mat-expansion-panel-header>
        <mat-panel-title>
          On False
        </mat-panel-title>
      </mat-expansion-panel-header>
      <avr-effect-editor [parent]="effect.onFalse"
                         [parentTypeStack]="newParentTypeStack"
                         [spell]="spell"
                         (changed)="changed.emit()">
      </avr-effect-editor>
      <avr-new-effect-card [metaParent]="effect.meta"
                           [parent]="effect.onFalse"
                           [parentTypeStack]="newParentTypeStack"
                           (changed)="changed.emit()">
      </avr-new-effect-card>
    </mat-expansion-panel>
  `,
  styleUrls: ['../effect-editor.component.css']
})
export class ConditionEffectComponent extends EffectComponent<Condition> implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
