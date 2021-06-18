import {Component, OnInit} from '@angular/core';
import {CastSpell} from '../../../../schemas/homebrew/AutomationEffects';
import {EffectComponent} from '../shared/EffectComponent';

@Component({
  selector: 'avr-spell-effect',
  template: `
    hello world
  `,
  styleUrls: ['../effect-editor.component.css']
})
export class SpellEffectComponent extends EffectComponent<CastSpell> implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
