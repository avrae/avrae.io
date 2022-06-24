import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Spell} from '../../../../schemas/homebrew/Spells';
import {AutomationEffect} from '../../types';
import {AutomationEffectTreeNode} from '../../utils';

@Component({template: ''})
export abstract class EffectComponent<T extends AutomationEffect> {
  @Input() effectNode: AutomationEffectTreeNode;
  @Input() spell: Spell;

  @Output() changed = new EventEmitter();
  @Output() treeChanged = new EventEmitter();
  @Output() deleted = new EventEmitter();

  get effect(): T {
    return this.effectNode.effect as T;
  }

  get isIEffectButton(): boolean {
    return this.effectNode.isInIEffectButton;
  }
}
