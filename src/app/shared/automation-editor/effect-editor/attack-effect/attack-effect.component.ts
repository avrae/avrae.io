import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Attack} from '../../../../schemas/homebrew/AutomationEffects';
import {Spell} from '../../../../schemas/homebrew/Spells';

@Component({
  selector: 'avr-attack-effect',
  template: `
    <div fxLayout="row" fxLayoutGap="4px" fxLayoutAlign="left center">
      <mat-checkbox [(ngModel)]="custom" (change)="changed.emit(); onCustomChange()">
        Has custom attack bonus
      </mat-checkbox>
      <mat-form-field *ngIf="custom">
        <input matInput placeholder="Custom Bonus" (change)="changed.emit()" [(ngModel)]="effect.attackBonus">
        <mat-icon matSuffix matTooltip="IntExpression - variables and functions allowed, braces optional">calculate</mat-icon>
      </mat-form-field>
    </div>
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-title>
          On Hit
        </mat-panel-title>
      </mat-expansion-panel-header>
      <avr-effect-editor [parent]="effect.hit" [spell]="spell" (changed)="changed.emit()"></avr-effect-editor>
      <avr-new-effect-card [metaParent]="effect.meta" [parent]="effect.hit"
                           [parentType]="effect.type" (changed)="changed.emit()"></avr-new-effect-card>
    </mat-expansion-panel>
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-title>
          On Miss
        </mat-panel-title>
      </mat-expansion-panel-header>
      <avr-effect-editor [parent]="effect.miss" [spell]="spell" (changed)="changed.emit()"></avr-effect-editor>
      <avr-new-effect-card [metaParent]="effect.meta" [parent]="effect.miss"
                           [parentType]="effect.type" (changed)="changed.emit()"></avr-new-effect-card>
    </mat-expansion-panel>
  `,
  styleUrls: ['../effect-editor.component.css']
})
export class AttackEffectComponent implements OnInit {

  @Input() effect: Attack;
  @Input() spell: Spell;
  @Output() changed = new EventEmitter();
  custom = false;

  constructor() {
  }

  ngOnInit() {
    if (this.effect.attackBonus || this.spell == null) {
      this.custom = true;
    }
  }

  onCustomChange() {
    if (!this.custom) {
      this.effect.attackBonus = '';
    }
  }

}
