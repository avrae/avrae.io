import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Save} from '../../../../../../../schemas/homebrew/SpellEffects';
import {Spell} from '../../../../../../../schemas/homebrew/Spells';

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
      </mat-form-field>
    </div>
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-title>
          On Fail
        </mat-panel-title>
      </mat-expansion-panel-header>
      <avr-effect-editor [parent]="effect.fail" [spell]="spell" (changed)="changed.emit()"></avr-effect-editor>
      <avr-new-effect-card [metaParent]="effect.meta" [parent]="effect.fail"
                           [parentType]="effect.type" (changed)="changed.emit()"></avr-new-effect-card>
    </mat-expansion-panel>
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-title>
          On Success
        </mat-panel-title>
      </mat-expansion-panel-header>
      <avr-effect-editor [parent]="effect.success" [spell]="spell" (changed)="changed.emit()"></avr-effect-editor>
      <avr-new-effect-card [metaParent]="effect.meta" [parent]="effect.success"
                           [parentType]="effect.type" (changed)="changed.emit()"></avr-new-effect-card>
    </mat-expansion-panel>
  `,
  styleUrls: ['../effect-editor.component.css']
})
export class SaveEffectComponent implements OnInit {

  @Input() effect: Save;
  @Input() spell: Spell;
  @Output() changed = new EventEmitter();
  custom = false;

  constructor() {
  }

  ngOnInit() {
    if (this.effect.dc) {
      this.custom = true;
    }
  }

  onCustomChange() {
    if (!this.custom) {
      this.effect.dc = '';
    }
  }

}
