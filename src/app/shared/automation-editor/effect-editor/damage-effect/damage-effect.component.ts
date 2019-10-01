import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Damage} from '../../../../schemas/homebrew/AutomationEffects';
import {Spell} from '../../../../schemas/homebrew/Spells';

@Component({
  selector: 'avr-damage-effect',
  template: `
    <div fxLayout="row" fxLayoutGap="4px" fxLayoutAlign="left center">
      <mat-form-field>
        <input matInput placeholder="Damage" (change)="changed.emit()" [(ngModel)]="effect.damage">
      </mat-form-field>
      <avr-higher-level [parent]="effect" [spell]="spell" (changed)="changed.emit()"></avr-higher-level>
      <mat-checkbox [(ngModel)]="effect.cantripScale" (change)="changed.emit()">
        Scales like Cantrip
      </mat-checkbox>
    </div>
  `,
  styleUrls: ['../effect-editor.component.css']
})
export class DamageEffectComponent implements OnInit {

  @Input() effect: Damage;
  @Input() spell: Spell;
  @Output() changed = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
