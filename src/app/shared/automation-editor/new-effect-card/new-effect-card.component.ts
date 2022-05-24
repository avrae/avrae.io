import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  Attack,
  AutomationEffect, CastSpell,
  Condition,
  Damage,
  IEffect,
  Roll,
  Save,
  SetVariable,
  Target,
  TempHP,
  Text,
  UseCounter
} from '../types';


// each type option defines a list of rules (function parents -> bool) - all must return true to be addable
const typeRules = new Map<string, Array<(stack: Array<string>) => boolean>>([
  ['target', [stack => !stack.includes('target')]],
  ['attack', [stack => stack.includes('target')]],
  ['save', [stack => stack.includes('target')]],
  ['damage', [stack => stack.includes('target')]],
  ['temphp', [stack => stack.includes('target')]],
  ['ieffect', [stack => stack.includes('target')]],
  ['roll', []],
  ['text', []],
  ['variable', []],
  ['condition', []],
  ['counter', []],
  ['spell', [stack => stack.length === 0]],
  ['attack and damage (Preset)', [stack => !stack.includes('target')]],
  ['save for half (Preset)', [stack => !stack.includes('target')]]
]);

@Component({
  selector: 'avr-new-effect-card',
  templateUrl: './new-effect-card.component.html',
  styleUrls: ['./new-effect-card.component.css']
})
export class NewEffectCardComponent implements OnInit {

  @Input() parent: AutomationEffect[];
  @Input() metaParent: AutomationEffect[];  // deprecated, unused
  @Input() parentTypeStack: string[];
  @Output() changed = new EventEmitter();
  availableTypes: string[];

  constructor() {
  }

  ngOnInit() {
    this.availableTypes = Array.from(typeRules.entries())
      .filter(([type, rules]) => rules.every(rule => rule(this.parentTypeStack)))
      .map(([type, rules]) => type);
  }

  addEffect(toAddType) {
    let effect: AutomationEffect;
    switch (toAddType) {
      case 'target':
        effect = {type: "target", target: "all", effects: []} as Target;
        break;
      // case 'attack':
      //   effect = new Attack();
      //   break;
      // case 'save':
      //   effect = new Save();
      //   break;
      // case 'damage':
      //   effect = new Damage();
      //   break;
      // case 'temphp':
      //   effect = new TempHP();
      //   break;
      // case 'ieffect':
      //   effect = new IEffect();
      //   break;
      // case 'roll':
      //   effect = new Roll();
      //   break;
      // case 'text':
      //   effect = new Text();
      //   break;
      // case 'variable':
      //   effect = new SetVariable();
      //   break;
      // case 'condition':
      //   effect = new Condition();
      //   break;
      // case 'counter':
      //   effect = new UseCounter();
      //   break;
      // case 'spell':
      //   effect = new CastSpell();
      //   break;
      // case 'attack and damage (Preset)':
      //   this.parent.push(...generateAttackAndDamagePreset());
      //   return;
      // case 'save for half (Preset)':
      //   this.parent.push(...generateSaveForHalfPreset());
      //   return;
      default:
        return;
    }
    this.newEffect(effect);
    this.changed.emit();
  }

  newEffect(effect: AutomationEffect) {
    this.parent.push(effect);
  }
}

function generateAttackAndDamagePreset(): AutomationEffect[] {
  return [
    // new Target('each', [
    //   new Attack([
    //     new Damage('1d10[fire]')
    //   ])
    // ])
  ];
}

function generateSaveForHalfPreset(): AutomationEffect[] {
  return [
    // new Roll('8d6[fire]', 'damage'),
    // new Target('all', [
    //   new Save('dex', [
    //     new Damage('{damage}')
    //   ], [
    //     new Damage('({damage})/2')
    //   ])
    // ])
  ];
}
