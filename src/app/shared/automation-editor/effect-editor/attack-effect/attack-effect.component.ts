import {Component, OnInit} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';
import {Attack} from '../../types';
import {EffectComponent} from '../shared/EffectComponent';

@Component({
  selector: 'avr-attack-effect',
  templateUrl: './attack-effect.component.html',
  styleUrls: ['../shared.scss', './attack-effect.component.css']
})
export class AttackEffectComponent extends EffectComponent<Attack> implements OnInit {
  custom = false;
  advantage = '0';
  customadvantage = '';

  constructor() {
    super();
  }

  ngOnInit() {
    if (this.effect.attackBonus || this.spell == null) {
      this.custom = true;
    }
    if (this.effect.adv && !['-1', '0', '1', '2'].includes(this.effect.adv)) {
      this.advantage = 'custom';
      this.customadvantage = this.effect.adv;
    } else {
      this.advantage = this.effect.adv || '0';
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

  onCustomAdvantageChange() {
    this.effect.adv = this.customadvantage;
  }
}
