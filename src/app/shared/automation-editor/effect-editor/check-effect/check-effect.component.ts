import {Component, OnInit} from '@angular/core';
import {AbilityCheck} from '../../types';
import {EffectComponent} from '../shared/EffectComponent';

@Component({
  selector: 'avr-check-effect',
  templateUrl: './check-effect.component.html',
  styleUrls: ['../shared.scss']
})
export class CheckEffectComponent extends EffectComponent<AbilityCheck> implements OnInit {
  checkType: 'basic' | 'dc' | 'contest' = 'basic';

  constructor() {
    super();
  }

  ngOnInit() {
    if (this.effect.contestAbility != null) {
      this.checkType = 'contest';
    } else if (this.effect.dc != null) {
      this.checkType = 'dc';
    }
  }

  onCheckTypeChange() {
    if (this.checkType === 'basic') {
      // basic checks: remove contestAbility, dc, contestTie
      this.effect.contestAbility = undefined;
      this.effect.dc = undefined;
      this.effect.contestTie = undefined;
    } else if (this.checkType === 'dc') {
      // dc: remove contestAbility, contestTie
      this.effect.contestAbility = undefined;
      this.effect.contestTie = undefined;
      // set dc attributes
      this.effect.dc = this.effect.dc ?? '';
      this.effect.success = this.effect.success ?? [];
      this.effect.fail = this.effect.fail ?? [];
    } else {
      // contest: remove dc
      this.effect.dc = undefined;
      // set contest attributes
      this.effect.contestAbility = this.effect.contestAbility ?? 'athletics'
      this.effect.contestTie = this.effect.contestTie ?? 'success';
      this.effect.success = this.effect.success ?? [];
      this.effect.fail = this.effect.fail ?? [];
    }
    this.changed.emit();
    this.treeChanged.emit();  // we emit treeChanged to re-render the contest/dc/no children branches
  }

  // ==== wrappers ====
  get abilityWrapper(): string[] {
    if (typeof this.effect.ability !== 'string') {
      return this.effect.ability;
    } else {
      return [this.effect.ability];
    }
  }

  set abilityWrapper(value: string[]) {
    if (value.length === 1) {
      this.effect.ability = value[0];
    } else {
      this.effect.ability = value;
    }
  }

  get contestAbilityWrapper(): string[] {
    if (typeof this.effect.contestAbility !== 'string') {
      return this.effect.contestAbility;
    } else {
      return [this.effect.contestAbility];
    }
  }

  set contestAbilityWrapper(value: string[]) {
    if (value.length === 1) {
      this.effect.contestAbility = value[0];
    } else {
      this.effect.contestAbility = value;
    }
  }

  // --- adv ---
  // copied from Save effect
  get advantageWrapper(): -1 | 0 | 1 {
    return this.effect.adv ?? 0;
  }

  set advantageWrapper(value) {
    this.effect.adv = value || undefined;
  }

}
