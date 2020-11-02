import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Condition} from '../../../../schemas/homebrew/AutomationEffects';
import {Spell} from '../../../../schemas/homebrew/Spells';

@Component({
  selector: 'avr-condition-effect',
  template: `
    <div fxLayout="row" fxLayoutGap="4px" fxLayoutAlign="left center">
      <mat-form-field>
        <input matInput placeholder="Condition" (change)="changed.emit()" [(ngModel)]="effect.condition">
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
      <avr-effect-editor [parent]="effect.onTrue" [spell]="spell" (changed)="changed.emit()"></avr-effect-editor>
      <avr-new-effect-card [metaParent]="effect.meta" [parent]="effect.onTrue"
                           [parentType]="effect.type" (changed)="changed.emit()"></avr-new-effect-card>
    </mat-expansion-panel>

    <mat-expansion-panel class="hoverable">
      <mat-expansion-panel-header>
        <mat-panel-title>
          On False
        </mat-panel-title>
      </mat-expansion-panel-header>
      <avr-effect-editor [parent]="effect.onFalse" [spell]="spell" (changed)="changed.emit()"></avr-effect-editor>
      <avr-new-effect-card [metaParent]="effect.meta" [parent]="effect.onFalse"
                           [parentType]="effect.type" (changed)="changed.emit()"></avr-new-effect-card>
    </mat-expansion-panel>
  `,
  styleUrls: ['../effect-editor.component.css']
})
export class ConditionEffectComponent implements OnInit {

  @Input() effect: Condition;
  @Input() spell: Spell;
  @Output() changed = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

}
