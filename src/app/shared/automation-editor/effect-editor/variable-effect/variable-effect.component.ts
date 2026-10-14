import {Component, OnInit} from '@angular/core';
import {SetVariable} from '../../types';
import {EffectComponent} from '../shared/EffectComponent';

@Component({
    selector: 'avr-variable-effect',
    templateUrl: './variable-effect.component.html',
    styleUrls: ['../shared.scss'],
    standalone: false
})
export class VariableEffectComponent extends EffectComponent<SetVariable> implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
