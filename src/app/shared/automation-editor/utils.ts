import {AbilityCheck, Attack, AutomationEffect, Condition, Save, Target} from './types';

export interface AutomationTreeNode {
  label: string;
  icon?: string;
  tooltip?: string;
  children?: AutomationTreeNode[];
}

export interface AutomationEffectTreeNode extends AutomationTreeNode {
  effect: AutomationEffect;
}

export interface AutomationAddNodeNode extends AutomationTreeNode {
  parentArray: AutomationEffect[];  // reference; if set, allows adding children
}

export function effectsToNodes(effects: AutomationEffect[]): AutomationTreeNode[] {
  // given a list of Automation effects, build the node tree to give to the TreeControl
  let out: AutomationTreeNode[] = [];
  for (const effect of effects) {
    const nodeDef = AUTOMATION_NODE_DEFS[effect.type];
    if (nodeDef === undefined) {
      out.push({
        label: 'Unknown Node',
        icon: 'help_outline',
        tooltip: 'This node is not yet supported by the web builder.',
        effect
      } as AutomationEffectTreeNode);
      continue;
    }
    out.push({
      label: nodeDef.label || effect.type,
      icon: nodeDef.icon,
      tooltip: nodeDef.tooltip,
      children: nodeDef.getChildren ? nodeDef.getChildren(effect) : undefined,
      effect
    } as AutomationEffectTreeNode);
  }

  out.push({
    label: 'Add Node',
    icon: 'add',
    parentArray: effects,
  } as AutomationAddNodeNode);

  return out;
}

// ==== a ====
interface NodeDef {
  label?: string;
  icon?: string;
  tooltip?: string;

  getChildren?(effect: AutomationEffect): AutomationTreeNode[];
}

interface NodeDefRegistry {
  [nodeType: string]: NodeDef;
}


export const AUTOMATION_NODE_DEFS: NodeDefRegistry = {
  target: {
    label: 'Target',
    getChildren(effect: Target): AutomationTreeNode[] {
      return effectsToNodes(effect.effects);
    }
  },
  attack: {
    label: 'Attack Roll',
    getChildren(effect: Attack): AutomationTreeNode[] {
      return [
        {label: 'Hit', effect, children: effectsToNodes(effect.hit)} as AutomationEffectTreeNode,
        {label: 'Miss', effect, children: effectsToNodes(effect.miss)} as AutomationEffectTreeNode
      ];
    }
  },
  save: {
    label: 'Saving Throw',
    getChildren(effect: Save): AutomationTreeNode[] {
      return [
        {label: 'Fail', effect, children: effectsToNodes(effect.fail)} as AutomationEffectTreeNode,
        {label: 'Success', effect, children: effectsToNodes(effect.success)} as AutomationEffectTreeNode
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
    label: 'Text'
  },
  variable: {
    label: 'Set Variable'
  },
  condition: {
    label: 'Branch',
    getChildren(effect: Condition): AutomationTreeNode[] {
      return [
        {label: 'On True', effect, children: effectsToNodes(effect.onTrue)} as AutomationEffectTreeNode,
        {label: 'On False', effect, children: effectsToNodes(effect.onFalse)} as AutomationEffectTreeNode
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
    getChildren(effect: AbilityCheck): AutomationTreeNode[] {
      if (effect.dc) {
        return [
          {label: 'Success', effect, children: effectsToNodes(effect.success)} as AutomationEffectTreeNode,
          {label: 'Fail', effect, children: effectsToNodes(effect.fail)} as AutomationEffectTreeNode
        ];
      } else if (effect.contestAbility) {
        return [
          {label: 'Target Wins', effect, children: effectsToNodes(effect.success)} as AutomationEffectTreeNode,
          {label: 'Caster Wins', effect, children: effectsToNodes(effect.fail)} as AutomationEffectTreeNode
        ];
      }
      return [];
    }
  }
};
