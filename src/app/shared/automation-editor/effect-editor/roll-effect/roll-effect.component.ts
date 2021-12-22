import {Component, OnInit} from '@angular/core';
import {Roll} from '../../../../schemas/homebrew/AutomationEffects';
import {EffectComponent} from '../shared/EffectComponent';

@Component({
  selector: 'avr-roll-effect',
  template: `
    <div fxLayout="row" fxLayoutGap="8px" fxLayoutAlign="left center" class="auto-row">
      <mat-form-field fxFlex="1 3 auto">
        <input matInput placeholder="Name" (change)="changed.emit()" [(ngModel)]="effect.name" required
               matTooltip="The result of the roll will be saved to an automation variable with this name.">
      </mat-form-field>
      <mat-form-field fxFlex="3 1 auto">
        <input matInput placeholder="Dice" (change)="changed.emit()" [(ngModel)]="effect.dice" required>
        <span matSuffix matTooltip="AnnotatedString - variables and functions allowed in braces">{{"{ }"}}</span>
      </mat-form-field>
      <mat-checkbox [(ngModel)]="effect.hidden" (change)="changed.emit()"
                    matTooltip="If checked, the roll won't display in the automation's Meta field or apply bonuses from the -d argument.">
        Hidden
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
export class RollEffectComponent extends EffectComponent<Roll> implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }
}
