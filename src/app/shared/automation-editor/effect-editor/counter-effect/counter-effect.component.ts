import {Component, OnInit} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';
import {groupBy} from 'lodash';
import {LimitedUse} from '../../../../schemas/GameData';
import {AbilityReference, SpellSlotReference, UseCounter} from '../../../../schemas/homebrew/AutomationEffects';
import {GamedataService} from '../../../gamedata.service';
import {EffectComponent} from '../shared/EffectComponent';

@Component({
  selector: 'avr-counter-effect',
  template: `
    <div>
      <span>Use {{counterType === 'ability' ? 'an' : 'a'}} </span>

      <mat-form-field>
        <mat-label>Counter Type</mat-label>
        <mat-select [(value)]="counterType" (selectionChange)="changed.emit(); onCounterTypeChange()">
          <mat-option value="ability">ability</mat-option>
          <mat-option value="counter">custom counter</mat-option>
          <mat-option value="slot">spell slot</mat-option>
        </mat-select>
      </mat-form-field>

      <span [ngSwitch]="counterType">
        <span *ngSwitchDefault>
          <span> named </span>
          <mat-form-field>
            <input matInput placeholder="Counter Name" (change)="changed.emit()" [(ngModel)]="effect.counter">
          </mat-form-field>
        </span>

        <span *ngSwitchCase="'slot'">
          <span> of level </span>
          <mat-form-field>
            <input matInput placeholder="Slot Level" type="number" max="9" min="1" (change)="changed.emit()"
                   [(ngModel)]="effect.counter.slot">
          </mat-form-field>
        </span>

        <span *ngSwitchCase="'ability'">
          <span> named </span>
          <mat-form-field matTooltip="When you run this action, I'll find the best counter to use for this ability automatically.">
            <mat-select [value]="selectedLimitedUse" (selectionChange)="onAbilitySelectionChange($event)">
              <mat-option>
                <ngx-mat-select-search placeholderLabel="Search"
                                       noEntriesFoundLabel="No matches found."
                                       ngModel (ngModelChange)="updateSearchFilteredGroupedLimitedUse($event)">
                </ngx-mat-select-search>
              </mat-option>
              <mat-optgroup *ngFor="let tup of searchFilteredGroupedLimitedUse" [label]="tup[0]">
                <mat-option *ngFor="let limitedUse of tup[1]" [value]="limitedUse">
                  {{limitedUse.name}}
                </mat-option>
              </mat-optgroup>
            </mat-select>
          </mat-form-field>
        </span>
      </span>
    </div>

    <div>
      <mat-form-field>
        <input matInput placeholder="Amount" (change)="changed.emit()" [(ngModel)]="effect.amount">
        <mat-icon matSuffix matTooltip="IntExpression - variables and functions allowed, braces optional">calculate</mat-icon>
      </mat-form-field>

      <mat-checkbox [(ngModel)]="effect.allowOverflow" (change)="changed.emit()" style="margin-left: 4px;">
        Allow Overflow
      </mat-checkbox>
    </div>

    <mat-form-field>
      <mat-label>Error Behaviour</mat-label>
      <mat-select [(value)]="effect.errorBehaviour" (selectionChange)="changed.emit()">
        <mat-option [value]="null">Ignore</mat-option>
        <mat-option value="warn">Show Warning</mat-option>
        <mat-option value="raise">Stop Execution</mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styleUrls: ['../effect-editor.component.css']
})
export class CounterEffectComponent extends EffectComponent<UseCounter> implements OnInit {
  counterType: 'counter' | 'slot' | 'ability';

  // abilityreference builder stuff
  limitedUse: LimitedUse[] = [];
  selectedLimitedUse: LimitedUse;
  searchFilteredGroupedLimitedUse: [string, LimitedUse[]][] = [];

  constructor(private gamedataService: GamedataService) {
    super();
  }

  ngOnInit(): void {
    this.loadLimitedUse();
    if (typeof this.effect.counter === 'string') {
      this.counterType = 'counter';
    } else if ('slot' in this.effect.counter) {
      this.counterType = 'slot';
    } else if ('id' in this.effect.counter) {
      this.counterType = 'ability';
    }
  }

  onCounterTypeChange(): void {
    if (this.counterType === 'counter') {
      this.effect.counter = '';
    } else if (this.counterType === 'slot') {
      this.effect.counter = new SpellSlotReference(1);
    } else if (this.counterType === 'ability') {
      this.effect.counter = new AbilityReference(1091, 222216831);  // default to like... second wind?
    }
  }

  onAbilitySelectionChange(event: MatSelectChange) {
    this.effect.counter = new AbilityReference(event.value.id, event.value.typeId);
    this.selectedLimitedUse = event.value;
  }

  updateSearchFilteredGroupedLimitedUse(searchTerm: string) {
    let filteredLimitedUse = this.limitedUse.filter(lu => lu.name.toLowerCase().includes(searchTerm.toLowerCase()));
    this.searchFilteredGroupedLimitedUse = Object.entries(groupBy(filteredLimitedUse, lu => lu.type));
  }

  // loaders
  loadLimitedUse() {
    this.gamedataService.getLimitedUse()
      .subscribe(result => {
        if (result.success) {
          this.limitedUse = result.data;
          const tempCounter = this.effect.counter as AbilityReference;  // WTF typescript? Next line doesn't work unless this is here
          this.selectedLimitedUse = this.limitedUse.find(lu => lu.id === tempCounter.id && lu.typeId === tempCounter.typeId);
          this.updateSearchFilteredGroupedLimitedUse('');
        }
      });
  }
}
