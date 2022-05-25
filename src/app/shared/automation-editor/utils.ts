import {AbilityCheck, Attack, AutomationEffect, Condition, Save, Target} from './types';

// ==== automation-editor ====
export interface AutomationTreeNode {
  label: string;
  icon?: string;
  tooltip?: string;
  children?: AutomationTreeNode[];
}

export interface AutomationEffectTreeNode extends AutomationTreeNode {
  effect: AutomationEffect;
  ancestors: AutomationEffect[];  // root -> direct parent list of ancestor effects
}

export interface AutomationAddEffectNode extends AutomationTreeNode {
  meta: NewEffectMeta;
}

export class AutomationTreeBuilder {
  isSpell: boolean;
  ancestors: AutomationEffect[] = [];

  constructor(isSpell: boolean) {
    this.isSpell = isSpell;
  }

  public effectsToNodes(effects: AutomationEffect[]): AutomationTreeNode[] {
    // given a list of Automation effects, build the node tree to give to the TreeControl
    let out: AutomationTreeNode[] = [];
    // copy the current ancestor state
    const ancestors = this.ancestors.slice();

    for (const effect of effects) {
      // update the ancestor state to account for the effect
      this.ancestors = [...ancestors, effect];

      // find the def for the effect
      const nodeDef = AUTOMATION_NODE_DEFS[effect.type];
      if (nodeDef === undefined) {
        out.push({
          label: 'Unknown Node',
          icon: 'help_outline',
          tooltip: 'This node is not yet supported by the web builder.',
          effect,
          ancestors
        } as AutomationEffectTreeNode);
        continue;
      }
      // recursively build nodes
      out.push({
        label: nodeDef.label || effect.type,
        icon: nodeDef.icon,
        tooltip: nodeDef.tooltip,
        children: nodeDef.getChildren ? nodeDef.getChildren(this, effect) : undefined,
        effect,
        ancestors
      } as AutomationEffectTreeNode);
    }

    // add node to add additional effects to the given effect array
    out.push({
      label: 'Add Effect',
      meta: {
        ancestors,
        parentArray: effects,
        isSpell: this.isSpell,
        isIEffect: ancestors.some(effect => effect.type === 'ieffect2')
      },
    } as AutomationAddEffectNode);

    // restore the old ancestor state
    this.ancestors = ancestors;

    return out;
  }
}

// ---- type => tree map ----
interface NodeDef {
  label?: string;
  icon?: string;
  tooltip?: string;

  getChildren?(builder: AutomationTreeBuilder, effect: AutomationEffect): AutomationTreeNode[];
}

interface NodeDefRegistry {
  [nodeType: string]: NodeDef;
}


export const AUTOMATION_NODE_DEFS: NodeDefRegistry = {
  target: {
    label: 'Target',
    getChildren(builder: AutomationTreeBuilder, effect: Target): AutomationTreeNode[] {
      return builder.effectsToNodes(effect.effects);
    }
  },
  attack: {
    label: 'Attack Roll',
    getChildren(builder: AutomationTreeBuilder, effect: Attack): AutomationTreeNode[] {
      return [
        {label: 'Hit', children: builder.effectsToNodes(effect.hit)},
        {label: 'Miss', children: builder.effectsToNodes(effect.miss)}
      ];
    }
  },
  save: {
    label: 'Saving Throw',
    getChildren(builder: AutomationTreeBuilder, effect: Save): AutomationTreeNode[] {
      return [
        {label: 'Fail', children: builder.effectsToNodes(effect.fail)},
        {label: 'Success', children: builder.effectsToNodes(effect.success)}
      ];
    }
  },
  damage: {
    label: 'Damage'
  },
  temphp: {
    label: 'Temp HP'
  },
  ieffect: {
    label: 'Initiative Effect (Legacy)'
  },
  ieffect2: {
    label: 'Initiative Effect',
    // todo
  },
  remove_ieffect: {
    label: 'Remove Initiative Effect'
  },
  roll: {
    label: 'Roll'
  },
  text: {
    label: 'Text',
    icon: 'chat'
  },
  variable: {
    label: 'Set Variable'
  },
  condition: {
    label: 'Branch',
    getChildren(builder: AutomationTreeBuilder, effect: Condition): AutomationTreeNode[] {
      return [
        {label: 'On True', children: builder.effectsToNodes(effect.onTrue)},
        {label: 'On False', children: builder.effectsToNodes(effect.onFalse)}
      ];
    }
  },
  counter: {
    label: 'Use Counter'
  },
  spell: {
    label: 'Cast Spell'
  },
  check: {
    label: 'Ability Check',
    getChildren(builder: AutomationTreeBuilder, effect: AbilityCheck): AutomationTreeNode[] {
      if (effect.dc) {
        return [
          {label: 'Success', children: builder.effectsToNodes(effect.success)},
          {label: 'Fail', children: builder.effectsToNodes(effect.fail)}
        ];
      } else if (effect.contestAbility) {
        return [
          {label: 'Target Wins', children: builder.effectsToNodes(effect.success)},
          {label: 'Caster Wins', children: builder.effectsToNodes(effect.fail)}
        ];
      }
      return [];
    }
  }
};

// ==== new-effect-button ====
export interface NewEffectMeta {
  ancestors: AutomationEffect[];  // root -> direct parent list of ancestor effects
  parentArray: AutomationEffect[];  // the array to add a new effect to
  isSpell: boolean;
  isIEffect: boolean;
}
