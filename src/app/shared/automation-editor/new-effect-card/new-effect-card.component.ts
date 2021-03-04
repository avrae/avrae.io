import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  Attack,
  AutomationEffect,
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
} from '../../../schemas/homebrew/AutomationEffects';

const typeOptions = new Map<string, Array<string>>(
  [
    ['root', ['target', 'roll', 'text', 'variable', 'condition', 'counter', 'attack and damage (Preset)', 'save for half (Preset)']],
    ['target', ['attack', 'save', 'damage', 'temphp', 'ieffect', 'roll', 'variable', 'condition', 'counter']],
    ['attack', ['attack', 'save', 'damage', 'temphp', 'ieffect', 'roll', 'text', 'variable', 'condition', 'counter']],
    ['save', ['attack', 'save', 'damage', 'temphp', 'ieffect', 'roll', 'text', 'variable', 'condition', 'counter']],
    ['damage', []],
    ['temphp', []],
    ['ieffect', []],
    ['roll', []],
    ['text', []],
    ['variable', []],
    ['condition', ['attack', 'save', 'damage', 'temphp', 'ieffect', 'roll', 'text', 'variable', 'condition', 'counter']],
    ['counter', []]
  ]
);

@Component({
  selector: 'avr-new-effect-card',
  templateUrl: './new-effect-card.component.html',
  styleUrls: ['./new-effect-card.component.css']
})
export class NewEffectCardComponent implements OnInit {

  @Input() parent: Array<AutomationEffect>;
  @Input() metaParent: Array<AutomationEffect>;  // deprecated, unused
  @Input() parentType: string;
  @Output() changed = new EventEmitter();
  toAddType: string;
  availableTypes: Array<string>;

  constructor() {
  }

  ngOnInit() {
    this.availableTypes = typeOptions.get(this.parentType);
  }

  addEffect() {
    let effect: AutomationEffect;
    switch (this.toAddType) {
      case 'target':
        effect = new Target();
        break;
      case 'attack':
        effect = new Attack();
        break;
      case 'save':
        effect = new Save();
        break;
      case 'damage':
        effect = new Damage();
        break;
      case 'temphp':
        effect = new TempHP();
        break;
      case 'ieffect':
        effect = new IEffect();
        break;
      case 'roll':
        effect = new Roll();
        break;
      case 'text':
        effect = new Text();
        break;
      case 'variable':
        effect = new SetVariable();
        break;
      case 'condition':
        effect = new Condition();
        break;
      case 'counter':
        effect = new UseCounter();
        break;
      case 'attack and damage (Preset)':
        this.parent.push(...generateAttackAndDamagePreset());
        return;
      case 'save for half (Preset)':
        this.parent.push(...generateSaveForHalfPreset());
        return;
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
    new Target('each', [
      new Attack([
        new Damage('1d10[fire]')
      ])
    ])
  ];
}

function generateSaveForHalfPreset(): AutomationEffect[] {
  return [
    new Roll('8d6[fire]', 'damage'),
    new Target('all', [
      new Save('dex', [
        new Damage('{damage}')
      ], [
        new Damage('({damage})/2')
      ])
    ])
  ];
}
