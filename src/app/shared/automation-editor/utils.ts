import {BehaviorSubject} from 'rxjs';
import {AttackEffectComponent} from './effect-editor/attack-effect/attack-effect.component';
import {ConditionEffectComponent} from './effect-editor/condition-effect/condition-effect.component';
import {CounterEffectComponent} from './effect-editor/counter-effect/counter-effect.component';
import {DamageEffectComponent} from './effect-editor/damage-effect/damage-effect.component';
import {IEffectEffectComponent} from './effect-editor/ieffect-effect/ieffect-effect.component';
import {RemoveIEffectEffectComponent} from './effect-editor/remove-ieffect-effect/remove-ieffect-effect.component';
import {RollEffectComponent} from './effect-editor/roll-effect/roll-effect.component';
import {SaveEffectComponent} from './effect-editor/save-effect/save-effect.component';
import {EffectComponent} from './effect-editor/shared/EffectComponent';
import {SpellEffectComponent} from './effect-editor/spell-effect/spell-effect.component';
import {TargetEffectComponent} from './effect-editor/target-effect/target-effect.component';
import {TempHPEffectComponent} from './effect-editor/temphp-effect/temphp-effect.component';
import {TextEffectComponent} from './effect-editor/text-effect/text-effect.component';
import {VariableEffectComponent} from './effect-editor/variable-effect/variable-effect.component';
import {AbilityCheck, Attack, AutomationEffect, Condition, IEffect, Save, Target} from './types';

// ==== automation-editor ====
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
  parentArray: AutomationEffect[];
  ancestors: AutomationEffect[];  // root -> direct parent list of ancestor effects

  constructor(effect: AutomationEffect, parentArray: AutomationEffect[], ancestors: AutomationEffect[], label: string, icon?: string, tooltip?: string, children?: AutomationTreeNode[]) {
    super(label, icon, tooltip, children);
    this.effect = effect;
    this.parentArray = parentArray;
    this.ancestors = ancestors;
  }
}

export class AutomationAddEffectNode extends AutomationTreeNode {
  meta: NewEffectMeta;

  constructor(meta: NewEffectMeta, label: string, icon?: string, tooltip?: string, children?: AutomationTreeNode[]) {
    super(label, icon, tooltip, children);
    this.meta = meta;
  }
}

export class AutomationTreeBuilder {
  isSpell: boolean;
  treeNodeMap: WeakMap<AutomationEffect, AutomationEffectTreeNode>;
  ancestors: AutomationEffect[] = [];

  constructor(isSpell: boolean) {
    this.isSpell = isSpell;
    this.treeNodeMap = new WeakMap<AutomationEffect, AutomationEffectTreeNode>();
  }

  public effectsToNodes(effects: AutomationEffect[]): AutomationTreeNode[] {
    // given a list of Automation effects, build the node tree to give to the TreeControl
    let out: AutomationTreeNode[] = [];

    for (const effect of effects) {
      out.push(this.effectToNode(effect, effects));
    }

    // add node to add additional effects to the given effect array
    out.push(new AutomationAddEffectNode(
      {
        ancestors: this.ancestors,
        parentArray: effects,
        isSpell: this.isSpell,
        isIEffect: this.ancestors.some(effect => effect.type === 'ieffect2')
      },
      'Add Effect'
    ));

    return out;
  }

  public effectToNode(effect: AutomationEffect, parentArray: AutomationEffect[]): AutomationEffectTreeNode {
    const existing = this.treeNodeMap.get(effect);

    // find the def for the effect
    const nodeDef = AUTOMATION_NODE_DEFS[effect.type];

    let result;
    let children;
    if (nodeDef === undefined) {
      result = new AutomationEffectTreeNode(
        effect,
        parentArray,
        this.ancestors,
        'Unknown Node',
        'help_outline',
        'This node is not yet supported by the web builder.',
      );
    } else {
      // update ancestor stack, recursively build nodes
      const oldAncestors = this.ancestors;
      this.ancestors = [...this.ancestors, effect];
      children = this.childrenBuilders[effect.type]?.call(this, effect);
      this.ancestors = oldAncestors;

      result = new AutomationEffectTreeNode(
        effect,
        parentArray,
        this.ancestors,
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

    this.treeNodeMap.set(effect, result);
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
      return [];  // todo
    },
    condition(effect: Condition): AutomationTreeNode[] {
      return [
        new AutomationTreeNode('On True', undefined, undefined, this.effectsToNodes(effect.onTrue)),
        new AutomationTreeNode('On False', undefined, undefined, this.effectsToNodes(effect.onFalse))
      ];
    },
    check(effect: AbilityCheck): AutomationTreeNode[] {
      if (effect.dc) {
        return [
          new AutomationTreeNode('Success', undefined, undefined, this.effectsToNodes(effect.success)),
          new AutomationTreeNode('Fail', undefined, undefined, this.effectsToNodes(effect.fail))
        ];
      } else if (effect.contestAbility) {
        return [
          new AutomationTreeNode('Target Wins', undefined, undefined, this.effectsToNodes(effect.success)),
          new AutomationTreeNode('Caster Wins', undefined, undefined, this.effectsToNodes(effect.fail))
        ];
      }
      return [];
    }
  };
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
    component: TargetEffectComponent
  },
  attack: {
    label: 'Attack Roll',
    component: AttackEffectComponent
  },
  save: {
    label: 'Saving Throw',
    component: SaveEffectComponent
  },
  damage: {
    label: 'Damage',
    component: DamageEffectComponent
  },
  temphp: {
    label: 'Temp HP',
    component: TempHPEffectComponent
  },
  ieffect: {
    label: 'Initiative Effect (Legacy)',
    component: IEffectEffectComponent
  },
  ieffect2: {
    label: 'Initiative Effect',
    // todo
  },
  remove_ieffect: {
    label: 'Remove Initiative Effect',
    component: RemoveIEffectEffectComponent
  },
  roll: {
    label: 'Roll',
    component: RollEffectComponent
  },
  text: {
    label: 'Text',
    icon: 'chat',
    component: TextEffectComponent
  },
  variable: {
    label: 'Set Variable',
    component: VariableEffectComponent
  },
  condition: {
    label: 'Branch',
    component: ConditionEffectComponent
  },
  counter: {
    label: 'Use Counter',
    component: CounterEffectComponent
  },
  spell: {
    label: 'Cast Spell',
    component: SpellEffectComponent
  },
  check: {
    label: 'Ability Check',
    // todo
  }
};

// ==== new-effect-button ====
export interface NewEffectMeta {
  ancestors: AutomationEffect[];  // root -> direct parent list of ancestor effects
  parentArray: AutomationEffect[];  // the array to add a new effect to
  isSpell: boolean;
  isIEffect: boolean;
}
