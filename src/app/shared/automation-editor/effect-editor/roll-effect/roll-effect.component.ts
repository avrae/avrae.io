import {Component, OnInit} from '@angular/core';
import {Roll} from '../../types';
import {EffectComponent} from '../shared/EffectComponent';

@Component({
  selector: 'avr-roll-effect',
  templateUrl: './roll-effect.component.html',
  styleUrls: ['../shared.css']
})
export class RollEffectComponent extends EffectComponent<Roll> implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }
}
