import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Roll} from '../../../../../../../schemas/homebrew/SpellEffects';

@Component({
  selector: 'avr-roll-effect',
  template: `
    <div fxLayout="row" fxLayoutGap="4px" fxLayoutAlign="left center">
      <mat-form-field>
        <input matInput placeholder="Name" (change)="changed.emit()" [(ngModel)]="effect.name">
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Dice" (change)="changed.emit()" [(ngModel)]="effect.dice">
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
export class RollEffectComponent implements OnInit {

  @Input() effect: Roll;
  @Output() changed = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
