import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IEffect} from '../../../../../../../schemas/homebrew/SpellEffects';

@Component({
  selector: 'avr-ieffect-effect',
  template: `
    <div fxLayout="row" fxLayoutGap="4px">
      <mat-form-field fxFlex="1 2 auto">
        <input matInput placeholder="Name" (change)="changed.emit()" [(ngModel)]="effect.name">
      </mat-form-field>
      <mat-form-field fxFlex="1 2 auto">
        <input matInput placeholder="Duration" (change)="changed.emit()" [(ngModel)]="effect.duration">
      </mat-form-field>
      <mat-form-field fxFlex="2 1 auto">
        <input matInput placeholder="Effects" (change)="changed.emit()" [(ngModel)]="effect.effects">
      </mat-form-field>
    </div>
  `,
  styleUrls: ['../effect-editor.component.css']
})
export class IEffectEffectComponent implements OnInit {

  @Input() effect: IEffect;
  @Output() changed = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
