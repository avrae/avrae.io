import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {groupBy} from 'lodash';
import {
  AbilityCheck,
  Attack,
  AttackInteraction,
  AutomationEffect,
  ButtonInteraction,
  CastSpell,
  Condition,
  Damage,
  IEffect,
  PassiveEffects,
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
  label?: string;  // defaults to utils.AUTOMATION_NODE_DEFS[id].label
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
  {id: 'preset_save_half', label: 'Save for Half', group: 'Presets', rules: [noAncestorOfType('target')]},
  {id: 'preset_prone', label: 'Prone Effect', group: 'Presets', rules: [hasAncestorOfType('target')]},
  {id: 'preset_save_to_end', label: 'Save to Remove Condition', group: 'Presets', rules: [hasAncestorOfType('target')]},
  {id: 'preset_recharge', label: 'Monster Ability Recharge', group: 'Presets', rules: [meta => meta.ancestors.length === 0]},
  {id: 'preset_basic_dot', label: 'Damage Over Time Effect', group: 'Presets', rules: [hasAncestorOfType('target')]},
  {id: 'preset_grapple', label: 'Grapple Contest', group: 'Presets', rules: [noAncestorOfType('target')]},
  {id: 'preset_aura', label: 'Basic Aura', group: 'Presets', rules: [noAncestorOfType('target')]},
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
          <mat-icon *ngIf="getRuleIcon(effectRule) && getRuleIcon(effectRule).includes('ddb:')"
                    [svgIcon]="getRuleIcon(effectRule)"></mat-icon>
          <mat-icon *ngIf="getRuleIcon(effectRule) && !getRuleIcon(effectRule).includes('ddb:')">{{getRuleIcon(effectRule)}}</mat-icon>
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
        effect = {type: 'check', ability: 'athletics'} as AbilityCheck;
        break;
      // --- presets ---
      case 'preset_atk_dmg':
        effect = this.generateAttackAndDamagePreset();
        break;
      case 'preset_save_half':
        this.doSaveForHalfPreset();
        return;
      case 'preset_prone':
        effect = this.generatePronePreset();
        break;
      case 'preset_recharge':
        effect = this.generateRechargePreset();
        break;
      case 'preset_save_to_end':
        effect = this.generateSaveToEndPreset();
        break;
      case 'preset_basic_dot':
        effect = this.generateBasicDOT();
        break;
      case 'preset_grapple':
        this.doGrapplePreset();
        return;
      case 'preset_aura':
        this.doAuraPreset();
        return;
      default:
        console.error(`Unknown effect type to add: "${toAddType}"`);
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

  generatePronePreset(): AutomationEffect {
    return {
      type: 'ieffect2',
      name: 'Prone',
      effects: {
        'attack_advantage': "-1"
      } as PassiveEffects,
      desc: "A prone creature's only movement option is to crawl, unless it stands up and thereby ends the condition",
      buttons: [
        {
          label: 'Stand Up',
          verb: 'stands up',
          automation: [
            {
              type: "remove_ieffect"
            } as RemoveIEffect
          ]
        } as ButtonInteraction
      ]
    } as IEffect;
  }

  generateRechargePreset(): AutomationEffect {
    return {
      type: 'target',
      target: 'self',
      effects: [
        {
          type: 'ieffect2',
          name: '&&& Used',
          buttons: [
            {
              label: 'Recharge &&&',
              verb: 'attempts to recharge their &&&',
              style: "3",
              automation: [
                {
                  type: 'roll',
                  dice: '1d6',
                  name: 'recharge'
                } as Roll,
                {
                  type: 'condition',
                  condition: 'int(recharge) >= 5',
                  onTrue: [
                    {
                      type: "remove_ieffect"
                    } as RemoveIEffect,
                    {
                      type: 'text',
                      text: '{{caster.name}} recharges their &&&!'
                    } as Text
                  ],
                  onFalse: [
                    {
                      type: 'text',
                      text: "{{caster.name}} doesn't recharge their &&&!"
                    } as Text
                  ]
                } as Condition
              ]
            } as ButtonInteraction
          ]
        } as IEffect
      ]
    } as Target;
  }

  generateSaveToEndPreset(): AutomationEffect {
    return {
      type: "ieffect2",
      name: "Condition",
      buttons: [
        {
          label: "Resist Condition",
          verb: "attempts to resist Condition",
          defaultDC: "lastSaveDC",
          automation: [
            {
              type: "target",
              target: "self",
              effects: [
                {
                  type: "save",
                  stat: "dex",
                  success: [
                    {
                      type: "remove_ieffect",
                      removeParent: "if_no_children"
                    } as RemoveIEffect
                  ],
                  fail: []
                } as Save
              ]
            } as Target
          ]
        } as ButtonInteraction
      ]
    } as IEffect;
  }

  generateBasicDOT(): AutomationEffect {
    return {
      type: "ieffect2",
      name: "On Fire",
      desc: "Target takes 1d4 fire damage at the start of their turn\n - Can spend an action to douse the flames",
      buttons: [
        {
          label: "On Fire",
          verb: "is burned by the fire",
          style: "4",
          automation: [
            {
              type: "target",
              target: "self",
              effects: [
                {
                  type: "damage",
                  damage: "1d4 [fire]"
                } as Damage
              ]
            } as Target
          ]
        } as ButtonInteraction,
        {
          label: "Douse Flame",
          verb: "spends their action putting out the fire",
          style: "3",
          automation: [
            {
              type: "remove_ieffect"
            } as RemoveIEffect
          ]
        } as ButtonInteraction
      ]
    } as IEffect
  }

  doGrapplePreset() {
    const effects = [
      {
        type: "target",
        target: 1,
        effects: [
          {
            type: "check",
            ability: ["acrobatics", "athletics"],
            contestAbility: ["athletics"],
            success: [],
            fail: [
              {
                type: "ieffect2",
                name: "Grappled",
                desc: "Grappled by {{caster.name}}",
                buttons: [
                  {
                    label: "Escape Grapple",
                    verb: "attempts to break out of the grapple",
                    style: "3",
                    automation: [
                      {
                        type: "target",
                        target: "children",
                        effects: [
                          {
                            type: "check",
                            ability: ["athletics"],
                            contestAbility: ["acrobatics", "athletics"],
                            success: [],
                            fail: [
                              {
                                type: "remove_ieffect"
                              } as RemoveIEffect
                            ],
                            contestTie: "fail"
                          } as AbilityCheck
                        ]
                      } as Target
                    ]
                  } as ButtonInteraction
                ],
                save_as: "grapple"
              } as IEffect
            ],
            contestTie: "neither"
          } as AbilityCheck
        ]
      } as Target,
      {
        type: "condition",
        condition: "not lastCheckDidPass",
        onTrue: [
          {
            type: "target",
            target: "self",
            effects: [
              {
                type: "ieffect2",
                name: "Grappling",
                desc: "Grappling {{targets[0].name if str(targets[0])!=targets[0] else targets[0]}}",
                buttons: [
                  {
                    label: "Release Grapple",
                    verb: "lets go of their target",
                    style: "1",
                    automation: [
                      {
                        type: "remove_ieffect",
                        removeParent: "always"
                      } as RemoveIEffect
                    ]
                  } as ButtonInteraction
                ],
                parent: "grapple"
              } as IEffect
            ]
          } as Target
        ],
        onFalse: [],
        errorBehaviour: "false"
      } as Condition
    ];
    this.meta.parentArray.push(...effects);
    this.created.emit();
  }

  doAuraPreset() {
    const effects = [
      {
        type: "target",
        target: "self",
        effects: [
          {
            type: "ieffect2",
            name: "Aura",
            duration: "101",
            desc: "Affects allies within 30 feet of you",
            save_as: "aura",
            attacks: [
              {
                attack: {
                  name: "Spread Aura",
                  automation: [
                    {
                      type: "target",
                      target: "each",
                      effects: [
                        {
                          type: "ieffect2",
                          name: "In the Aura",
                          duration: "ieffect.remaining",
                          desc: "Lasts while within 30 feet of {{caster.name}}",
                          parent: "ieffect",
                          buttons: [
                            {
                              label: "Leave Aura",
                              verb: "leaves the range of the Aura",
                              style: "4",
                              automation: [
                                {
                                  type: "remove_ieffect"
                                } as RemoveIEffect
                              ]
                            } as ButtonInteraction
                          ]
                        } as IEffect
                      ]
                    } as Target
                  ],
                  _v: 2,
                  verb: "begins to",
                  proper: true
                }
              } as AttackInteraction
            ]
          } as IEffect
        ]
      } as Target,
      {
        type: "target",
        target: "each",
        effects: [
          {
            type: "ieffect2",
            name: "In the Aura",
            duration: 101,
            desc: "Lasts while within 30 feet of {{caster.name}}",
            parent: "aura",
            buttons: [
              {
                label: "Leave Aura",
                verb: "leaves the range of the Aura",
                style: "4",
                automation: [
                  {
                    type: "remove_ieffect"
                  } as RemoveIEffect
                ]
              } as ButtonInteraction
            ]
          } as IEffect
        ]
      } as Target
    ];
    this.meta.parentArray.push(...effects);
    this.created.emit();
  }
}



