import {BehaviorSubject} from 'rxjs';
import {AttackEffectComponent} from './effect-editor/attack-effect/attack-effect.component';
import {CheckEffectComponent} from './effect-editor/check-effect/check-effect.component';
import {ConditionEffectComponent} from './effect-editor/condition-effect/condition-effect.component';
import {CounterEffectComponent} from './effect-editor/counter-effect/counter-effect.component';
import {DamageEffectComponent} from './effect-editor/damage-effect/damage-effect.component';
import {IEffectEffectComponent} from './effect-editor/ieffect-effect/ieffect-effect.component';
import {IEffect2EffectComponent} from './effect-editor/ieffect-effect/ieffect2-effect.component';
import {RemoveIEffectEffectComponent} from './effect-editor/remove-ieffect-effect/remove-ieffect-effect.component';
import {RollEffectComponent} from './effect-editor/roll-effect/roll-effect.component';
import {SaveEffectComponent} from './effect-editor/save-effect/save-effect.component';
import {EffectComponent} from './effect-editor/shared/EffectComponent';
import {SpellEffectComponent} from './effect-editor/spell-effect/spell-effect.component';
import {TargetEffectComponent} from './effect-editor/target-effect/target-effect.component';
import {TempHPEffectComponent} from './effect-editor/temphp-effect/temphp-effect.component';
import {TextEffectComponent} from './effect-editor/text-effect/text-effect.component';
import {VariableEffectComponent} from './effect-editor/variable-effect/variable-effect.component';
import {AbilityCheck, Attack, AttackInteraction, AutomationEffect, ButtonInteraction, Condition, IEffect, Save, Target} from './types';

// ==== automation-editor ====
export interface NodeContext {
  ancestors: AutomationEffect[];  // root -> direct parent list of ancestor effects
  parentArray: AutomationEffect[];  // the array to add a new effect to
  isSpell: boolean;
  isIEffect: boolean;
  isIEffectButton: boolean;
}

// nodes
export class AutomationTreeNode {
  label: string;
  icon?: string;
  tooltip?: string;

  _children?: AutomationTreeNode[];
  get children() {
    return this._children;
  };

  set children(value: AutomationTreeNode[]) {
    this._children = value;
    this.childrenSubject.next(value);
  }

  childrenSubject: BehaviorSubject<AutomationTreeNode[]>;

  constructor(label: string, icon?: string, tooltip?: string, children?: AutomationTreeNode[]) {
    this.label = label;
    this.icon = icon;
    this.tooltip = tooltip;
    this._children = children;
    this.childrenSubject = new BehaviorSubject<AutomationTreeNode[]>(children);
  }
}

export class AutomationEffectTreeNode extends AutomationTreeNode {
  effect: AutomationEffect;
  context: NodeContext;

  constructor(effect: AutomationEffect, context: NodeContext, label: string, icon?: string, tooltip?: string, children?: AutomationTreeNode[]) {
    super(label, icon, tooltip, children);
    this.effect = effect;
    this.context = context;
  }
}

export class AutomationAddEffectNode extends AutomationTreeNode {
  context: NodeContext;

  constructor(context: NodeContext, label: string, icon?: string, tooltip?: string, children?: AutomationTreeNode[]) {
    super(label, icon, tooltip, children);
    this.context = context;
  }
}

// builder
export class AutomationTreeBuilder {
  context: Partial<NodeContext> = {ancestors: []};
  effectTreeNodeMap: WeakMap<AutomationEffect, AutomationEffectTreeNode>;

  constructor(isSpell: boolean) {
    this.context.isSpell = isSpell;
    this.effectTreeNodeMap = new WeakMap<AutomationEffect, AutomationEffectTreeNode>();
  }

  public effectsToNodes(effects: AutomationEffect[]): AutomationTreeNode[] {
    // given a list of Automation effects, build the node tree to give to the TreeControl
    let out: AutomationTreeNode[] = [];

    for (const effect of effects) {
      out.push(this.effectToNode(effect, effects));
    }

    // add node to add additional effects to the given effect array
    out.push(new AutomationAddEffectNode(
      this.getContext(effects),
      'Add Effect'
    ));

    return out;
  }

  public effectToNode(effect: AutomationEffect, parentArray: AutomationEffect[]): AutomationEffectTreeNode {
    const existing = this.effectTreeNodeMap.get(effect);

    // find the def for the effect
    const nodeDef = AUTOMATION_NODE_DEFS[effect.type];

    let result;
    let children;
    if (nodeDef === undefined) {
      result = new AutomationEffectTreeNode(
        effect,
        this.getContext(parentArray),
        'Unknown Node',
        'help_outline',
        'This node is not yet supported by the web builder.',
      );
    } else {
      // update ancestor stack, recursively build nodes
      children = this.withContext(
        {ancestors: [...this.context.ancestors, effect]},
        () => this.childrenBuilders[effect.type]?.call(this, effect)
      );

      result = new AutomationEffectTreeNode(
        effect,
        this.getContext(parentArray),
        nodeDef.label || effect.type,
        nodeDef.icon,
        nodeDef.tooltip,
        children
      );
    }

    if (existing) {
      // update the attributes of the existing node:
      // all we need to do is update the children since the other attrs are static for a given effect type
      if (effect.type === 'target') {
        // special case since target's children are AutomationEffectTreeNodes
        // and ieffect2's children have mapping (see ieffect2 helpers)
        existing.children = children;
      } else if (existing.children?.length === children?.length) {
        for (let idx = 0; idx < existing.children?.length ?? 0; idx++) {
          existing.children[idx].label = children[idx].label;
          existing.children[idx].icon = children[idx].icon;
          existing.children[idx].tooltip = children[idx].tooltip;
          existing.children[idx].children = children[idx].children;
        }
      } else {
        existing.children = children;
      }
      return existing;
    }

    this.effectTreeNodeMap.set(effect, result);
    return result;
  }

  // context helpers
  private getContext(parentArray: AutomationEffect[]): NodeContext {
    return {
      parentArray,
      ancestors: this.context.ancestors ?? [],
      isSpell: this.context.isSpell ?? false,
      isIEffect: this.context.isIEffect ?? false,
      isIEffectButton: this.context.isIEffectButton ?? false
    };
  }

  private withContext<T>(contextProps: Partial<NodeContext>, callback: () => T): T {
    const oldContext = {...this.context};
    Object.assign(this.context, contextProps);
    const result = callback();
    this.context = oldContext;
    return result;
  }

  // impls for node children
  private childrenBuilders = {
    target(effect: Target): AutomationTreeNode[] {
      return this.effectsToNodes(effect.effects);
    },
    attack(effect: Attack): AutomationTreeNode[] {
      return [
        new AutomationTreeNode('Hit', undefined, undefined, this.effectsToNodes(effect.hit)),
        new AutomationTreeNode('Miss', undefined, undefined, this.effectsToNodes(effect.miss))
      ];
    },
    save(effect: Save): AutomationTreeNode[] {
      return [
        new AutomationTreeNode('Fail', undefined, undefined, this.effectsToNodes(effect.fail)),
        new AutomationTreeNode('Success', undefined, undefined, this.effectsToNodes(effect.success))
      ];
    },
    ieffect2(effect: IEffect): AutomationTreeNode[] {
      const out = [];
      for (const attack of effect.attacks ?? []) {
        out.push(this.ieffect2AttackNode(attack));
      }
      for (const button of effect.buttons ?? []) {
        out.push(this.ieffect2ButtonNode(button));
      }
      return out;
    },
    condition(effect: Condition): AutomationTreeNode[] {
      return [
        new AutomationTreeNode('On True', undefined, undefined, this.effectsToNodes(effect.onTrue)),
        new AutomationTreeNode('On False', undefined, undefined, this.effectsToNodes(effect.onFalse))
      ];
    },
    check(effect: AbilityCheck): AutomationTreeNode[] {
      if (effect.dc != null) {
        return [
          new AutomationTreeNode('Success', undefined, undefined, this.effectsToNodes(effect.success)),
          new AutomationTreeNode('Fail', undefined, undefined, this.effectsToNodes(effect.fail))
        ];
      } else if (effect.contestAbility != null) {
        return [
          new AutomationTreeNode('Target Wins', undefined, undefined, this.effectsToNodes(effect.success)),
          new AutomationTreeNode('Caster Wins', undefined, undefined, this.effectsToNodes(effect.fail))
        ];
      }
      return [];
    }
  };

  // ieffect2 helpers
  ieffect2AttackNode(attack: AttackInteraction): AutomationTreeNode {
    return this.ieffect2Node(attack, `Action: ${attack.attack.name}`, attack.attack.automation, undefined, 'Edit the parent Initiative Effect node to edit this attack!');
  }

  ieffect2ButtonNode(button: ButtonInteraction): AutomationTreeNode {
    return this.withContext(
      {isIEffectButton: true},
      () => this.ieffect2Node(button, `Button: ${button.label}`, button.automation, undefined, 'Edit the parent Initiative Effect node to edit this button!')
    );
  }

  ieffect2Node(interaction: AttackInteraction | ButtonInteraction, name: string, automation: AutomationEffect[], icon, tooltip) {
    // update ancestor stack, recursively build nodes
    const children = this.withContext(
      {ancestors: [], isIEffect: true},
      () => this.effectsToNodes(automation)
    );
    return new AutomationTreeNode(name, icon, tooltip, children);
  }
}

// ==== helpful node constants ====
type EffectComponentImpl = (new (..._) => EffectComponent<any>);

interface NodeDef {
  label?: string;
  icon?: string;
  tooltip?: string;
  component?: EffectComponentImpl;
}

interface NodeDefRegistry {
  [nodeType: string]: NodeDef;
}


export const AUTOMATION_NODE_DEFS: NodeDefRegistry = {
  target: {
    label: 'Target',
    icon: 'my_location',
    component: TargetEffectComponent
  },
  attack: {
    label: 'Attack Roll',
    icon: 'ddb:melee-attack',
    component: AttackEffectComponent
  },
  save: {
    label: 'Saving Throw',
    icon: 'ddb:resistant',
    component: SaveEffectComponent
  },
  damage: {
    label: 'Damage',
    icon: 'ddb:force',
    component: DamageEffectComponent
  },
  temphp: {
    label: 'Temp HP',
    icon: 'ddb:healing',
    component: TempHPEffectComponent
  },
  ieffect: {
    label: 'Initiative Effect (Legacy)',
    icon: 'extension',
    component: IEffectEffectComponent
  },
  ieffect2: {
    label: 'Initiative Effect',
    icon: 'extension',
    component: IEffect2EffectComponent
  },
  remove_ieffect: {
    label: 'Remove Initiative Effect',
    icon: 'extension_off',
    component: RemoveIEffectEffectComponent
  },
  roll: {
    label: 'Roll',
    icon: 'ddb:digital-dice',
    component: RollEffectComponent
  },
  text: {
    label: 'Text',
    icon: 'chat',
    component: TextEffectComponent
  },
  variable: {
    label: 'Set Variable',
    icon: 'code',
    component: VariableEffectComponent
  },
  condition: {
    label: 'Branch',
    icon: 'call_split',
    component: ConditionEffectComponent
  },
  counter: {
    label: 'Use Counter',
    icon: 'looks_one',
    component: CounterEffectComponent
  },
  spell: {
    label: 'Cast Spell',
    icon: 'ddb:spells',
    component: SpellEffectComponent
  },
  check: {
    label: 'Ability Check',
    icon: 'beenhere',
    component: CheckEffectComponent
  }
};

