import {Component, OnInit} from '@angular/core';
import {TempHP} from '../../types';
import {EffectComponent} from '../shared/EffectComponent';

@Component({
  selector: 'avr-temphp-effect',
  templateUrl: './temphp-effect.component.html',
  styleUrls: ['../shared.scss']
})
export class TempHPEffectComponent extends EffectComponent<TempHP> implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }

}
