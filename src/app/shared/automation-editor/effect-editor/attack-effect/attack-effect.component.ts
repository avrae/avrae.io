import {Component, OnInit} from '@angular/core';
import {Attack} from '../../../../schemas/homebrew/AutomationEffects';
import {EffectComponent} from '../shared/EffectComponent';

@Component({
  selector: 'avr-attack-effect',
  template: `
    <div fxLayout="row" fxLayoutGap="4px" fxLayoutAlign="left center">
      <mat-checkbox [(ngModel)]="custom" (change)="changed.emit(); onCustomChange()" *ngIf="spell != null">
        Has custom attack bonus
      </mat-checkbox>
      <mat-form-field *ngIf="custom">
        <input matInput placeholder="Attack Bonus" class="text-monospace" (change)="changed.emit()" [(ngModel)]="effect.attackBonus">
        <mat-icon matSuffix matTooltip="IntExpression - variables and functions allowed, braces optional">calculate</mat-icon>
      </mat-form-field>
    </div>
    <mat-expansion-panel class="hoverable">
      <mat-expansion-panel-header>
        <mat-panel-title>
          On Hit
        </mat-panel-title>
      </mat-expansion-panel-header>
      <avr-effect-editor [parent]="effect.hit"
                         [parentTypeStack]="newParentTypeStack"
                         [spell]="spell"
                         (changed)="changed.emit()">
      </avr-effect-editor>
      <avr-new-effect-card [metaParent]="effect.meta"
                           [parent]="effect.hit"
                           [parentTypeStack]="newParentTypeStack"
                           (changed)="changed.emit()">
      </avr-new-effect-card>
    </mat-expansion-panel>
    <mat-expansion-panel class="hoverable">
      <mat-expansion-panel-header>
        <mat-panel-title>
          On Miss
        </mat-panel-title>
      </mat-expansion-panel-header>
      <avr-effect-editor [parent]="effect.miss"
                         [parentTypeStack]="newParentTypeStack"
                         [spell]="spell"
                         (changed)="changed.emit()">
      </avr-effect-editor>
      <avr-new-effect-card [metaParent]="effect.meta"
                           [parent]="effect.miss"
                           [parentTypeStack]="newParentTypeStack"
                           (changed)="changed.emit()">
      </avr-new-effect-card>
    </mat-expansion-panel>
  `,
  styleUrls: ['../effect-editor.component.css']
})
export class AttackEffectComponent extends EffectComponent<Attack> implements OnInit {
  custom = false;

  constructor() {
    super();
  }

  ngOnInit() {
    if (this.effect.attackBonus || this.spell == null) {
      this.custom = true;
    }
  }

  onCustomChange() {
    if (!this.custom) {
      this.effect.attackBonus = undefined;
    }
  }

}
