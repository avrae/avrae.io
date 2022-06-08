import {Component, OnInit} from '@angular/core';
import {LegacyIEffect} from '../../types';
import {EffectComponent} from '../shared/EffectComponent';

@Component({
  selector: 'avr-ieffect-effect',
  templateUrl: './ieffect-effect.component.html',
  styleUrls: ['../shared.scss']
})
export class IEffectEffectComponent extends EffectComponent<LegacyIEffect> implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }
}
