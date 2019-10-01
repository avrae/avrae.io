import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TempHP} from '../../../../schemas/homebrew/AutomationEffects';
import {Spell} from '../../../../schemas/homebrew/Spells';

@Component({
  selector: 'avr-temphp-effect',
  template: `
    <div fxLayout="row" fxLayoutGap="4px" fxLayoutAlign="left center">
      <mat-form-field>
        <input matInput placeholder="Amount" (change)="changed.emit()" [(ngModel)]="effect.amount">
      </mat-form-field>
      <avr-higher-level *ngIf="spell != null" [parent]="effect" [spell]="spell" (changed)="changed.emit()"></avr-higher-level>
      <mat-checkbox *ngIf="spell != null" [(ngModel)]="effect.cantripScale" (change)="changed.emit()">
        Scales like Cantrip
      </mat-checkbox>
    </div>
  `,
  styleUrls: ['../effect-editor.component.css']
})
export class TempHPEffectComponent implements OnInit {

  @Input() effect: TempHP;
  @Input() spell: Spell;
  @Output() changed = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
