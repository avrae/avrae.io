import {Component, OnInit} from '@angular/core';
import {Damage} from '../../../../schemas/homebrew/AutomationEffects';
import {EffectComponent} from '../shared/EffectComponent';

@Component({
  selector: 'avr-damage-effect',
  template: `
    <div fxLayout="row" fxLayoutGap="8px" fxLayoutAlign="left center">
      <mat-form-field fxFlex>
        <input matInput placeholder="Damage" (change)="changed.emit()" [(ngModel)]="effect.damage" required>
        <span matSuffix matTooltip="AnnotatedString - variables and functions allowed in braces">{{"{ }"}}</span>
      </mat-form-field>
      <mat-checkbox [(ngModel)]="effect.overheal" (change)="changed.emit()">
        Allow Overheal
      </mat-checkbox>
    </div>

    <div fxLayout="row" fxLayoutGap="8px" fxLayoutAlign="left center" *ngIf="spell != null">
      <avr-higher-level fxFlex [parent]="effect" [spell]="spell" (changed)="changed.emit()"></avr-higher-level>
      <mat-checkbox [(ngModel)]="effect.cantripScale" (change)="changed.emit()">
        Scales like Cantrip
      </mat-checkbox>
    </div>
  `,
  styleUrls: ['../effect-editor.component.css']
})
export class DamageEffectComponent extends EffectComponent<Damage> implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }
}
