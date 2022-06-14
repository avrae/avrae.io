import {Component, OnInit} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';
import {groupBy} from 'lodash';
import {LimitedUse} from '../../../../schemas/GameData';
import {GamedataService} from '../../../gamedata.service';
import {AbilityReference, UseCounter} from '../../types';
import {EffectComponent} from '../shared/EffectComponent';

@Component({
  selector: 'avr-counter-effect',
  templateUrl: './counter-effect.component.html',
  styleUrls: ['../shared.scss']
})
export class CounterEffectComponent extends EffectComponent<UseCounter> implements OnInit {
  counterType: 'counter' | 'slot' | 'ability';

  // abilityreference builder stuff
  limitedUse: LimitedUse[] = [];
  selectedLimitedUse: LimitedUse;
  searchFilteredGroupedLimitedUse: [string, LimitedUse[]][] = [];

  // error behaviour - defaults to warn on undefined
  get errorBehaviourWrapper(): 'warn' | 'raise' | 'ignore' {
    if (this.effect.errorBehaviour === undefined) {
      return 'warn';
    }
    return this.effect.errorBehaviour ?? 'ignore';
  }

  set errorBehaviourWrapper(value: 'warn' | 'raise' | 'ignore') {
    if (value === 'warn') {
      this.effect.errorBehaviour = undefined;
    } else {
      this.effect.errorBehaviour = value;
    }
  }

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
      this.effect.counter = {slot: 1};
    } else if (this.counterType === 'ability') {
      this.effect.counter = {id: 1091, typeId: 222216831};  // default to like... second wind?
    }
  }

  onAbilitySelectionChange(event: MatSelectChange) {
    this.effect.counter = {id: event.value.id, typeId: event.value.typeId};
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
