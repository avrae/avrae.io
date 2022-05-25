import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {groupBy} from 'lodash';
import {
  AbilityCheck,
  Attack,
  AutomationEffect,
  CastSpell,
  Condition,
  Damage,
  IEffect,
  RemoveIEffect,
  Roll,
  Save,
  SetVariable,
  Target,
  TempHP,
  Text,
  UseCounter
} from './types';
import {AUTOMATION_NODE_DEFS, NewEffectMeta} from './utils';

function hasAncestorOfType(type: string): (meta: NewEffectMeta) => boolean {
  return meta => meta.ancestors.some(effect => effect.type === type);
}

function noAncestorOfType(type: string): (meta: NewEffectMeta) => boolean {
  return meta => !(hasAncestorOfType(type)(meta));
}

interface EffectRule {
  id: string;
  rules: Array<(meta: NewEffectMeta) => boolean>;
  label?: string;  // defaults to "Add ${utils.AUTOMATION_NODE_DEFS[id].label}"
  group?: string;  // defaults to "Effects"
  icon?: string;  // defaults to utils.AUTOMATION_NODE_DEFS[id].icon
}

// each type option defines a list of rules (meta -> bool) - all must return true to be addable
const typeRules: EffectRule[] = [
  {id: 'target', rules: [noAncestorOfType('target')]},
  {id: 'attack', rules: [hasAncestorOfType('target')]},
  {id: 'save', rules: [hasAncestorOfType('target')]},
  {id: 'damage', rules: [hasAncestorOfType('target')]},
  {id: 'temphp', rules: [hasAncestorOfType('target')]},
  {id: 'ieffect2', rules: [hasAncestorOfType('target')]},
  {id: 'remove_ieffect', rules: [meta => meta.isIEffect]},
  {id: 'roll', rules: []},
  {id: 'text', rules: []},
  {id: 'variable', rules: []},
  {id: 'condition', rules: []},
  {id: 'counter', rules: []},
  {id: 'spell', rules: [meta => meta.ancestors.length === 0, meta => !meta.isSpell]},
  {id: 'check', rules: [hasAncestorOfType('target')]},
  // --- presets ---
  {id: 'preset_atk_dmg', label: 'Attack and Damage', group: 'Presets', rules: [noAncestorOfType('target')]},
  {id: 'preset_save_half', label: 'Save for Half', group: 'Presets', rules: [noAncestorOfType('target')]}
];

// ==== component ====
@Component({
  selector: 'avr-new-effect-button',
  template: `
    <button mat-icon-button [matMenuTriggerFor]="menu">
      <mat-icon>add</mat-icon>
    </button>
    <mat-menu #menu="matMenu">
      <div *ngFor="let group of satisfiedRules">
        <!-- use a disabled button as a group label -->
        <button mat-menu-item disabled>
          <strong>{{group[0]}}</strong>
        </button>

        <!-- render each button in the group -->
        <button mat-menu-item *ngFor="let effectRule of group[1]" (click)="addEffect(effectRule.id)">
          <mat-icon *ngIf="getRuleIcon(effectRule)">{{getRuleIcon(effectRule)}}</mat-icon>
          <span>{{getRuleLabel(effectRule)}}</span>
        </button>
      </div>
    </mat-menu>
  `,
  styleUrls: ['./automation-editor.component.scss'],
  encapsulation: ViewEncapsulation.None  // inherit button styling from automation-editor
})
export class NewEffectButtonComponent implements OnInit {

  @Input() meta: NewEffectMeta;
  @Output() created = new EventEmitter();
  satisfiedRules: [string, EffectRule[]][];

  constructor() {
  }

  ngOnInit() {
    const satisfiedRules = typeRules
      .filter((effectRule) => effectRule.rules.every(rule => rule(this.meta)));
    this.satisfiedRules = Object.entries(groupBy(satisfiedRules, effectRule => effectRule.group ?? 'Effects'));
  }

  // display
  getRuleIcon(rule: EffectRule): string | null {
    return rule.icon ?? AUTOMATION_NODE_DEFS[rule.id]?.icon ?? null;
  }

  getRuleLabel(rule: EffectRule): string {
    return rule.label ?? AUTOMATION_NODE_DEFS[rule.id]?.label ?? rule.id;
  }

  // data
  addEffect(toAddType) {
    let effect: AutomationEffect;
    switch (toAddType) {
      case 'target':
        effect = {type: 'target', target: 'self', effects: []} as Target;
        break;
      case 'attack':
        effect = {type: 'attack', hit: [], miss: []} as Attack;
        break;
      case 'save':
        effect = {type: 'save', stat: 'dex', fail: [], success: []} as Save;
        break;
      case 'damage':
        effect = {type: 'damage', damage: ''} as Damage;
        break;
      case 'temphp':
        effect = {type: 'temphp', amount: ''} as TempHP;
        break;
      case 'ieffect2':
        effect = {type: 'ieffect2', name: ''} as IEffect;
        break;
      case 'remove_ieffect':
        effect = {type: 'remove_ieffect'} as RemoveIEffect;
        break;
      case 'roll':
        effect = {type: 'roll', dice: '', name: ''} as Roll;
        break;
      case 'text':
        effect = {type: 'text', text: ''} as Text;
        break;
      case 'variable':
        effect = {type: 'variable', name: '', value: ''} as SetVariable;
        break;
      case 'condition':
        effect = {type: 'condition', condition: '', onTrue: [], onFalse: []} as Condition;
        break;
      case 'counter':
        effect = {type: 'counter', counter: '', amount: ''} as UseCounter;
        break;
      case 'spell':
        effect = {type: 'spell', id: 2102} as CastSpell;
        break;
      case 'check':
        effect = {type: 'check', ability: 'arcana'} as AbilityCheck;
        break;
      // --- presets ---
      case 'preset_atk_dmg':
        effect = this.generateAttackAndDamagePreset();
        break;
      case 'preset_save_half':
        this.doSaveForHalfPreset();
        return;
      default:
        console.error(`Unknown effect type to add: "${toAddType}"`)
        return;
    }
    this.newEffect(effect);
    this.created.emit();
  }

  newEffect(effect: AutomationEffect) {
    this.meta.parentArray.push(effect);
  }

  // --- presets ---
  generateAttackAndDamagePreset(): AutomationEffect {
    return {
      type: 'target',
      target: 'each',
      effects: [
        {
          type: 'attack',
          hit: [
            {type: 'damage', damage: '1d10[fire]'} as Damage
          ],
          miss: []
        } as Attack
      ]
    } as Target;
  }

  doSaveForHalfPreset() {
    const effects = [
      {type: 'roll', dice: '8d6[fire]', name: 'damage'} as Roll,
      {
        type: 'target',
        target: 'all',
        effects: [
          {
            type: 'save',
            stat: 'dex',
            fail: [
              {type: 'damage', damage: '{damage}'} as Damage
            ],
            success: [
              {type: 'damage', damage: '({damage}/2)'} as Damage
            ]
          } as Save
        ]
      } as Target
    ];
    this.meta.parentArray.push(...effects);
    this.created.emit();
  }
}



