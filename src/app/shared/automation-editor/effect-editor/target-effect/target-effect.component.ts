import {Component, OnInit} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';
import {Target} from '../../../../schemas/homebrew/AutomationEffects';
import {EffectComponent} from '../shared/EffectComponent';

type TargetType = 'all' | 'each' | 'self' | 'position';
type TargetSortType = 'user' | 'hp_asc' | 'hp_desc';

@Component({
  selector: 'avr-target-effect',
  template: `
    <div fxLayout="row" fxLayoutGap="6px">
      <mat-form-field>
        <mat-label>Target</mat-label>
        <mat-select [(value)]="selectedTarget" (selectionChange)="onTargetSelectChange($event)">
          <mat-option value="all">All (usually saves)</mat-option>
          <mat-option value="each">Each (usually attacks)</mat-option>
          <mat-option value="self">Caster</mat-option>
          <mat-option value="position">Position</mat-option>
        </mat-select>
      </mat-form-field>

      <!-- target position -->
      <mat-form-field *ngIf="isNumber(effect.target)">
        <input matInput placeholder="Target Position" type="number" min="1"
               [value]="effect.target.toString()" (change)="onTargetPosChange(targetPosInput)" #targetPosInput>
      </mat-form-field>

      <!-- target sorting -->
      <mat-form-field *ngIf="effect.target !== 'self'"
                      matTooltip="If not given, targets are processed in the order the -t arguments are given. Usually this is what you want.">
        <mat-label>Sort Targets By</mat-label>
        <mat-select [(value)]="selectedTargetSort" (selectionChange)="onTargetSortChange($event)">
          <mat-option value="user">User Input</mat-option>
          <mat-option value="hp_asc">HP Ascending</mat-option>
          <mat-option value="hp_desc">HP Descending</mat-option>
        </mat-select>
      </mat-form-field>
    </div>

    <avr-effect-editor [parent]="effect.effects"
                       [parentTypeStack]="newParentTypeStack"
                       [spell]="spell"
                       (changed)="changed.emit()">
    </avr-effect-editor>

    <avr-new-effect-card [metaParent]="effect.meta"
                         [parent]="effect.effects"
                         [parentTypeStack]="newParentTypeStack"
                         (changed)="changed.emit()">
    </avr-new-effect-card>
  `,
  styleUrls: ['../effect-editor.component.css']
})
export class TargetEffectComponent extends EffectComponent<Target> implements OnInit {
  selectedTarget: TargetType = 'all';
  selectedTargetSort: TargetSortType = 'user';

  constructor() {
    super();
  }

  ngOnInit() {
    this.selectedTarget = typeof this.effect.target === 'number' ? 'position' : this.effect.target as TargetType;
    this.selectedTargetSort = (this.effect.sortBy ?? 'user') as TargetSortType;
  }

  isNumber(val) {
    return typeof val === 'number';
  }

  onTargetSelectChange(changeEvent: MatSelectChange) {
    if (changeEvent.value === 'position') {
      this.effect.target = 1;
    } else {
      this.effect.target = changeEvent.value;
    }

    if (changeEvent.value === 'self') {
      this.selectedTargetSort = 'user';
      this.effect.sortBy = undefined;
    }

    this.changed.emit();
  }

  onTargetPosChange(targetPosInput) {
    this.effect.target = +targetPosInput.value;
    this.changed.emit();
  }

  onTargetSortChange(changeEvent: MatSelectChange) {
    if (changeEvent.value === 'user') {
      this.effect.sortBy = undefined;
    } else {
      this.effect.sortBy = changeEvent.value;
    }
    this.changed.emit();
  }
}
