import {Component, OnInit} from '@angular/core';
import {Save} from '../../../../schemas/homebrew/AutomationEffects';
import {EffectComponent} from '../shared/EffectComponent';

@Component({
  selector: 'avr-save-effect',
  template: `
    <div fxLayout="row" fxLayoutGap="4px" fxLayoutAlign="left center">
      <mat-form-field>
        <mat-label>Save Stat</mat-label>
        <mat-select [(value)]="effect.stat" (selectionChange)="changed.emit()">
          <mat-option value="str">Strength</mat-option>
          <mat-option value="dex">Dexterity</mat-option>
          <mat-option value="con">Constitution</mat-option>
          <mat-option value="int">Intelligence</mat-option>
          <mat-option value="wis">Wisdom</mat-option>
          <mat-option value="cha">Charisma</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-checkbox [(ngModel)]="custom" (change)="changed.emit(); onCustomChange()">
        Has custom DC
      </mat-checkbox>
      <mat-form-field *ngIf="custom">
        <input matInput placeholder="Custom DC" (change)="changed.emit()" [(ngModel)]="effect.dc">
        <mat-icon matSuffix matTooltip="IntExpression - variables and functions allowed, braces optional">calculate</mat-icon>
      </mat-form-field>
    </div>
    <mat-expansion-panel class="hoverable">
      <mat-expansion-panel-header>
        <mat-panel-title>
          On Fail
        </mat-panel-title>
      </mat-expansion-panel-header>
      <avr-effect-editor [parent]="effect.fail"
                         [parentTypeStack]="newParentTypeStack"
                         [spell]="spell"
                         (changed)="changed.emit()">
      </avr-effect-editor>
      <avr-new-effect-card [metaParent]="effect.meta"
                           [parent]="effect.fail"
                           [parentTypeStack]="newParentTypeStack"
                           (changed)="changed.emit()">
      </avr-new-effect-card>
    </mat-expansion-panel>
    <mat-expansion-panel class="hoverable">
      <mat-expansion-panel-header>
        <mat-panel-title>
          On Success
        </mat-panel-title>
      </mat-expansion-panel-header>
      <avr-effect-editor [parent]="effect.success"
                         [parentTypeStack]="newParentTypeStack"
                         [spell]="spell"
                         (changed)="changed.emit()">
      </avr-effect-editor>
      <avr-new-effect-card [metaParent]="effect.meta"
                           [parent]="effect.success"
                           [parentTypeStack]="newParentTypeStack"
                           (changed)="changed.emit()">
      </avr-new-effect-card>
    </mat-expansion-panel>
  `,
  styleUrls: ['../effect-editor.component.css']
})
export class SaveEffectComponent extends EffectComponent<Save> implements OnInit {
  custom = false;

  constructor() {
    super();
  }

  ngOnInit() {
    if (this.effect.dc || this.spell == null) {
      this.custom = true;
    }
  }

  onCustomChange() {
    if (!this.custom) {
      this.effect.dc = '';
    }
  }

}
