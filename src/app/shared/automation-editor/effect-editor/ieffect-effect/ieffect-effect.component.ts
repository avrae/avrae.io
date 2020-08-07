import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IEffect} from '../../../../schemas/homebrew/AutomationEffects';
import {Spell} from '../../../../schemas/homebrew/Spells';

@Component({
  selector: 'avr-ieffect-effect',
  template: `
    <div fxLayout="row" fxLayoutGap="4px">
      <mat-form-field fxFlex="1 2 auto">
        <input matInput placeholder="Name" (change)="changed.emit()" [(ngModel)]="effect.name">
      </mat-form-field>
      <mat-form-field fxFlex="1 2 auto">
        <input matInput placeholder="Duration" (change)="changed.emit()" [(ngModel)]="effect.duration">
        <mat-icon matSuffix matTooltip="IntExpression - variables and functions allowed, braces optional">calculate</mat-icon>
      </mat-form-field>
      <mat-form-field fxFlex="2 1 auto">
        <input matInput placeholder="Effects" (change)="changed.emit()" [(ngModel)]="effect.effects">
        <span matSuffix matTooltip="AnnotatedString - variables and functions allowed in braces">{{"{ }"}}</span>
      </mat-form-field>
      <mat-checkbox [(ngModel)]="effect.end" (change)="changed.emit();">
        Ticks on end?
      </mat-checkbox>
    </div>
  `,
  styleUrls: ['../effect-editor.component.css']
})
export class IEffectEffectComponent implements OnInit {

  @Input() effect: IEffect;
  @Input() spell: Spell;
  @Output() changed = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
