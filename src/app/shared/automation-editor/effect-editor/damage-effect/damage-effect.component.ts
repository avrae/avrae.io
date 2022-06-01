import {Component, OnInit} from '@angular/core';
import {Damage} from '../../types';
import {EffectComponent} from '../shared/EffectComponent';

@Component({
  selector: 'avr-damage-effect',
  templateUrl: './damage-effect.component.html',
  styleUrls: ['../shared.scss']
})
export class DamageEffectComponent extends EffectComponent<Damage> implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }
}
