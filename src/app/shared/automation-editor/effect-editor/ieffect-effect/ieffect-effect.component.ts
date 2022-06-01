import {Component, OnInit} from '@angular/core';
import {IEffect} from '../../types';
import {EffectComponent} from '../shared/EffectComponent';

@Component({
  selector: 'avr-ieffect-effect',
  templateUrl: './ieffect-effect.component.html',
  styleUrls: ['../shared.scss']
})
export class IEffectEffectComponent extends EffectComponent<IEffect> implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }
}
