import {Component, OnInit} from '@angular/core';
import {SetVariable} from '../../types';
import {EffectComponent} from '../shared/EffectComponent';

@Component({
  selector: 'avr-variable-effect',
  template: `
    <div fxLayout="row" fxLayoutGap="4px" fxLayoutAlign="left center" class="auto-row">
      <mat-form-field fxFlex="1 3 auto">
        <input matInput placeholder="Name" class="text-monospace" (change)="changed.emit()" [(ngModel)]="effect.name" required>
      </mat-form-field>

      <mat-form-field fxFlex="3 1 auto">
        <input matInput placeholder="Value" class="text-monospace" (change)="changed.emit()" [(ngModel)]="effect.value" required>
        <mat-icon matSuffix matTooltip="IntExpression - variables and functions allowed, braces optional">calculate</mat-icon>
      </mat-form-field>

      <mat-form-field fxFlex="2 1 auto">
        <input matInput placeholder="On Error" class="text-monospace" (change)="changed.emit()" [(ngModel)]="effect.onError">
        <mat-icon matSuffix matTooltip="IntExpression - variables and functions allowed, braces optional">calculate</mat-icon>
      </mat-form-field>
    </div>
    <div fxLayout="row" fxLayoutGap="4px" fxLayoutAlign="left center" *ngIf="spell != null">
      <avr-higher-level fxFlex [parent]="effect" [spell]="spell" (changed)="changed.emit()"></avr-higher-level>
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
