import {Component, OnInit} from '@angular/core';
import {Damage} from '../../../../schemas/homebrew/AutomationEffects';
import {EffectComponent} from '../shared/EffectComponent';

@Component({
  selector: 'avr-damage-effect',
  template: `
    <div fxLayout="row" fxLayoutGap="4px" fxLayoutAlign="left center">
      <mat-form-field>
        <input matInput placeholder="Damage" (change)="changed.emit()" [(ngModel)]="effect.damage">
        <span matSuffix matTooltip="AnnotatedString - variables and functions allowed in braces">{{"{ }"}}</span>
      </mat-form-field>
      <mat-checkbox [(ngModel)]="effect.overheal" (change)="changed.emit()">
        Allow Overheal
      </mat-checkbox>
      <mat-checkbox [(ngModel)]="effect.nocritical" (change)="changed.emit()">
        Prevent Critical Damage
      </mat-checkbox>
      <avr-higher-level *ngIf="spell != null" [parent]="effect" [spell]="spell" (changed)="changed.emit()"></avr-higher-level>
      <mat-checkbox *ngIf="spell != null" [(ngModel)]="effect.cantripScale" (change)="changed.emit()">
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
