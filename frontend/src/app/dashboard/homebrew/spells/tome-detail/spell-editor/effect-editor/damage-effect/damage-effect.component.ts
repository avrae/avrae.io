import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Damage} from '../../../../../../../schemas/homebrew/SpellEffects';

@Component({
  selector: 'avr-damage-effect',
  template: `
    <div fxLayout="row" fxLayoutGap="4px" fxLayoutAlign="left center">
      <mat-form-field>
        <input matInput placeholder="Damage" (change)="changed.emit()" [(ngModel)]="effect.damage">
      </mat-form-field>
      <div *ngIf="effect.higher != undefined">
        <!--Higher level stuff here TODO-->
        asdf
      </div>
      <mat-checkbox [(ngModel)]="effect.cantripScale" (change)="changed.emit()">
        Scales like Cantrip
      </mat-checkbox>
    </div>
  `,
  styleUrls: ['../effect-editor.component.css']
})
export class DamageEffectComponent implements OnInit {

  @Input() effect: Damage;
  @Output() changed = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
