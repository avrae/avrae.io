import {Component, OnInit} from '@angular/core';
import {SetVariable} from '../../../../schemas/homebrew/AutomationEffects';
import {EffectComponent} from '../shared/EffectComponent';

@Component({
  selector: 'avr-variable-effect',
  template: `
    <div fxLayout="row" fxLayoutGap="4px" fxLayoutAlign="left center">
      <mat-form-field>
        <input matInput placeholder="Name" (change)="changed.emit()" [(ngModel)]="effect.name">
      </mat-form-field>

      <mat-form-field>
        <input matInput placeholder="Value" (change)="changed.emit()" [(ngModel)]="effect.value">
        <mat-icon matSuffix matTooltip="IntExpression - variables and functions allowed, braces optional">calculate</mat-icon>
      </mat-form-field>

      <mat-form-field>
        <input matInput placeholder="On Error" (change)="changed.emit()" [(ngModel)]="effect.onError">
        <mat-icon matSuffix matTooltip="IntExpression - variables and functions allowed, braces optional">calculate</mat-icon>
      </mat-form-field>

      <avr-higher-level *ngIf="spell != null" [parent]="effect" [spell]="spell" (changed)="changed.emit()"></avr-higher-level>
    </div>
  `,
  styleUrls: ['../effect-editor.component.css']
})
export class VariableEffectComponent extends EffectComponent<SetVariable> implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
