import {Component, OnInit} from '@angular/core';
import {IEffect} from '../../../../schemas/homebrew/AutomationEffects';
import {EffectComponent} from '../shared/EffectComponent';

@Component({
  selector: 'avr-ieffect-effect',
  template: `
    <div fxLayout="row" fxLayoutGap="4px">
      <mat-form-field fxFlex="1 2 auto">
        <input matInput placeholder="Name" (change)="changed.emit()" [(ngModel)]="effect.name">
      </mat-form-field>
      <mat-form-field fxFlex="1 2 auto">
        <input matInput placeholder="Duration" (change)="changed.emit()" [(ngModel)]="effect.duration"
               matTooltip="Use -1 for infinite duration.">
        <mat-icon matSuffix matTooltip="IntExpression - variables and functions allowed, braces optional">calculate</mat-icon>
      </mat-form-field>
      <mat-form-field fxFlex="2 1 auto">
        <input matInput placeholder="Effects" (change)="changed.emit()" [(ngModel)]="effect.effects">
        <span matSuffix matTooltip="AnnotatedString - variables and functions allowed in braces">{{"{ }"}}</span>
      </mat-form-field>
    </div>
    <div fxLayout="row" fxLayoutGap="8px">
      <mat-checkbox [(ngModel)]="effect.end" (change)="changed.emit();"
                    matTooltip="Whether the effect duration ticks down at the end of the turn rather than the start.">
        Ticks on end?
      </mat-checkbox>
      <mat-checkbox [(ngModel)]="effect.conc" (change)="changed.emit();">
        Requires concentration?
      </mat-checkbox>
      <mat-checkbox [(ngModel)]="effect.stacking" (change)="changed.emit();">
        Stacking?
      </mat-checkbox>
    </div>
    <div fxLayout="row">
      <mat-form-field class="wide">
        <textarea matInput placeholder="Description" rows="3" (change)="changed.emit()"
                  [(ngModel)]="effect.desc" maxlength="500"></textarea>
        <span matSuffix matTooltip="AnnotatedString - variables and functions allowed in braces">{{"{ }"}}</span>
      </mat-form-field>
    </div>
  `,
  styleUrls: ['../effect-editor.component.css']
})
export class IEffectEffectComponent extends EffectComponent<IEffect> implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }
}
