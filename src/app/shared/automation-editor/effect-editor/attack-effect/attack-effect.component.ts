import {Component, OnInit} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';
import {Attack} from '../../../../schemas/homebrew/AutomationEffects';
import {EffectComponent} from '../shared/EffectComponent';

@Component({
  selector: 'avr-attack-effect',
  template: `
    <div fxLayout="row" fxLayoutGap="4px" fxLayoutAlign="left center" class="auto-row">
      <mat-checkbox [(ngModel)]="custom" (change)="changed.emit(); onCustomChange()" *ngIf="spell != null">
        Has custom attack bonus
      </mat-checkbox>
      <mat-form-field *ngIf="custom">
        <input matInput placeholder="Attack Bonus" class="text-monospace" (change)="changed.emit()" [(ngModel)]="effect.attackBonus">
        <mat-icon matSuffix matTooltip="IntExpression - variables and functions allowed, braces optional">calculate</mat-icon>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Advantage</mat-label>
        <mat-select [(value)]="advantage" (selectionChange)="onAdvantageSelectChange($event)">
          <mat-option value="0">Flat</mat-option>
          <mat-option value="1">Advantage</mat-option>
          <mat-option value="2">Elven Accuracy</mat-option>
          <mat-option value="-1">Disadvantage</mat-option>
          <mat-option value="custom">Custom</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field *ngIf="advantage === 'custom'">
        <input matInput [(ngModel)]="customadvantage" placeholder="Custom Advantage" class="text-monospace" (change)="changed.emit()" [(ngModel)]="effect.adv" matTooltip="0 for Flat\n1 for Advantage\n2 for Elven Accuracy\n-1 for Disadvantage" [matTooltipClass]="'adv-tooltip'">
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
  advantage = '0';
  customadvantage = ""

  constructor() {
    super();
  }

  ngOnInit() {
    if (this.effect.attackBonus || this.spell == null) {
      this.custom = true;
    }
    if (!["-1", "0", "1", "2"].includes(this.effect.adv)) {
      this.advantage = 'custom'
      this.customadvantage = this.effect.adv
    } else {
      this.advantage = this.effect.adv
    }
  }

  onCustomChange() {
    if (!this.custom) {
      this.effect.attackBonus = undefined;
    }
  }

  onAdvantageSelectChange(changeEvent: MatSelectChange) {
    if (changeEvent.value === 'custom') {
      this.effect.adv = this.customadvantage;
    } else {
      this.effect.adv = changeEvent.value;
    }

    this.changed.emit();
  }

}
