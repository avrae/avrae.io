import {Component, OnInit} from '@angular/core';
import {Save} from '../../types';
import {EffectComponent} from '../shared/EffectComponent';

@Component({
  selector: 'avr-save-effect',
  templateUrl: './save-effect.component.html',
  styleUrls: ['../shared.css']
})
export class SaveEffectComponent extends EffectComponent<Save> implements OnInit {
  custom = false;

  constructor() {
    super();
  }

  ngOnInit() {
    if (this.effect.dc || this.spell == null) {
      this.custom = true;
    }
  }

  onCustomChange() {
    if (!this.custom) {
      this.effect.dc = undefined;
    }
  }

}
