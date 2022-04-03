import {Component, OnInit} from '@angular/core';
import {TempHP} from '../../../../schemas/homebrew/AutomationEffects';
import {EffectComponent} from '../shared/EffectComponent';

@Component({
  selector: 'avr-temphp-effect',
  template: `
    <div fxLayout="row" fxLayoutGap="4px" fxLayoutAlign="left center" class="auto-row">
      <mat-form-field fxFlex>
        <input matInput placeholder="Amount" (change)="changed.emit()" [(ngModel)]="effect.amount" required>
        <span matSuffix matTooltip="AnnotatedString - variables and functions allowed in braces">{{"{ }"}}</span>
      </mat-form-field>
    </div>
    <div fxLayout="column" fxLayout.gt-xs="row" fxLayoutGap="8px" fxLayoutAlign="left center" *ngIf="spell != null">
      <avr-higher-level fxFlex [parent]="effect" [spell]="spell" (changed)="changed.emit()"></avr-higher-level>
      <mat-checkbox [(ngModel)]="effect.cantripScale" (change)="changed.emit()">
        Scales like Cantrip
      </mat-checkbox>
    </div>
  `,
  styleUrls: ['../effect-editor.component.css']
})
export class TempHPEffectComponent extends EffectComponent<TempHP> implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }

}
