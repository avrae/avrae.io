import {Component, OnInit} from '@angular/core';
import {Condition} from '../../types';
import {EffectComponent} from '../shared/EffectComponent';

@Component({
  selector: 'avr-condition-effect',
  templateUrl: 'condition-effect.component.html',
  styleUrls: ['../shared.css']
})
export class ConditionEffectComponent extends EffectComponent<Condition> implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
