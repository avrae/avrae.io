import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Attack, Damage, IEffect, Roll, Save, SpellEffect, Target, TempHP, Text} from '../../../schemas/homebrew/SpellEffects';

const typeOptions = new Map<string, Array<string>>(
  [
    ['root', ['target', 'text', 'attack and damage (Preset)', 'save for half (Preset)']],
    ['meta', ['roll']],
    ['target', ['attack', 'save', 'damage', 'temphp', 'ieffect']],
    ['attack', ['attack', 'save', 'damage', 'temphp', 'ieffect', 'text']],
    ['save', ['attack', 'save', 'damage', 'temphp', 'ieffect', 'text']],
    ['damage', []],
    ['temphp', []],
    ['ieffect', []],
    ['roll', []],
    ['text', []]
  ]
);

@Component({
  selector: 'avr-new-effect-card',
  templateUrl: './new-effect-card.component.html',
  styleUrls: ['./new-effect-card.component.css']
})
export class NewEffectCardComponent implements OnInit {

  @Input() parent: Array<SpellEffect>;
  @Input() metaParent: Array<SpellEffect>;
  @Input() parentType: string;
  @Output() changed = new EventEmitter();
  toAddType: { option: string, meta: boolean };
  availableTypes: Array<string>;
  availableMetaTypes: Array<string>;

  constructor() {
  }

  ngOnInit() {
    this.availableTypes = typeOptions.get(this.parentType);
    this.availableMetaTypes = typeOptions.get('meta');
  }

  addEffect() {
    let effect: SpellEffect;
    switch (this.toAddType.option) {
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
      case 'attack and damage (Preset)':
        effect = new AttackAndDamagePreset();
        break;
      case 'save for half (Preset)':
        effect = new SaveForHalfPreset();
        break;
      default:
        return;
    }
    if (this.toAddType.meta) {
      this.newMeta(effect);
    } else {
      this.newEffect(effect);
    }
    this.changed.emit();
  }

  newEffect(effect: SpellEffect) {
    this.parent.push(effect);
  }

  newMeta(effect: SpellEffect) {
    this.metaParent.push(effect);
  }
}

class AttackAndDamagePreset extends Target {
  constructor() {
    const effects: SpellEffect[] = [
      new Attack([
        new Damage('1d10[fire]')
      ])
    ];
    super('each', effects, []);
  }
}

class SaveForHalfPreset extends Target {
  constructor() {
    const effects: SpellEffect[] = [
      new Save('dex', [
        new Damage('{damage}')
      ], [
        new Damage('({damage})/2')
      ])
    ];
    const meta: SpellEffect[] = [
      new Roll('8d6[fire]', 'damage')
    ];
    super('all', effects, meta);
  }
}
