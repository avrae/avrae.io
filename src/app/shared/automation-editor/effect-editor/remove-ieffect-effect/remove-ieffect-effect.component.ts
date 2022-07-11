import {Component, OnInit} from '@angular/core';
import {RemoveIEffect} from '../../types';
import {EffectComponent} from '../shared/EffectComponent';

@Component({
  selector: 'avr-remove-ieffect-effect',
  templateUrl: './remove-ieffect-effect.component.html',
  styleUrls: ['../shared.scss']
})
export class RemoveIEffectEffectComponent extends EffectComponent<RemoveIEffect> implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  get removeParentWrapper() {
    return this.effect.removeParent ?? 'never';
  }

  set removeParentWrapper(value) {
    if (value == 'never') {
      this.effect.removeParent = undefined;
    } else {
      this.effect.removeParent = value;
    }
  }

}
