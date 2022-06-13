import {Component, OnInit} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';
import {Target} from '../../types';
import {EffectComponent} from '../shared/EffectComponent';

type TargetType = 'all' | 'each' | 'self' | 'position' | 'parent' | 'children';
type TargetSortType = 'user' | 'hp_asc' | 'hp_desc';

@Component({
  selector: 'avr-target-effect',
  templateUrl: './target-effect.component.html',
  styleUrls: ['../shared.scss']
})
export class TargetEffectComponent extends EffectComponent<Target> implements OnInit {
  selectedTarget: TargetType = 'self';
  selectedTargetSort: TargetSortType = 'user';

  constructor() {
    super();
  }

  ngOnInit() {
    this.selectedTarget = this.isNumber(this.effect.target) ? 'position' : this.effect.target as TargetType;
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
