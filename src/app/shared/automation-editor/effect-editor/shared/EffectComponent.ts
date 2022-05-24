import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AutomationEffect} from '../../types';
import {Spell} from '../../../../schemas/homebrew/Spells';

@Component({template: ''})
export abstract class EffectComponent<T extends AutomationEffect> {
  @Input() effect: T;
  @Input() parentTypeStack: string[];
  @Input() spell: Spell;
  @Output() changed = new EventEmitter();

  get newParentTypeStack(): string[] {
    return [...this.parentTypeStack, this.effect.type];
  }
}
