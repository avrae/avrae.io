import {Attack as CharacterAttack} from '../../schemas/Character';

// helper types
type AnnotatedString = string;
type IntExpression = string;
type HigherLevels<T = string> = Map<number, T>;


// exported types
export interface AutomationEffect {
  type: string;
  meta?: AutomationEffect[];
}

export interface Target extends AutomationEffect {
  type: 'target';
  target: 'all' | 'each' | number | 'self' | 'parent' | 'children';
  effects: AutomationEffect[];
  sortBy?: 'hp_asc' | 'hp_desc';
}

export interface Attack extends AutomationEffect {
  type: 'attack';
  hit: AutomationEffect[];
  miss: AutomationEffect[];
  attackBonus?: IntExpression;
  adv?: IntExpression; // 1 == adv || 2 == ea || -1 == dis || 0 == flat
}

export interface Save extends AutomationEffect {
  type: 'save';
  stat: 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
  fail: AutomationEffect[];
  success: AutomationEffect[];
  dc?: IntExpression;
  adv?: -1 | 0 | 1;
}

export interface Damage extends AutomationEffect {
  type: 'damage';
  damage: AnnotatedString;
  overheal?: boolean;
  higher?: HigherLevels;
  cantripScale?: boolean;
  fixedValue?: boolean;
}

export interface TempHP extends AutomationEffect {
  type: 'temphp';
  amount: AnnotatedString;
  higher?: HigherLevels;
  cantripScale?: boolean;
}

export interface LegacyIEffect extends AutomationEffect {
  type: 'ieffect';
  name: string;
  duration: number | IntExpression;
  effects: AnnotatedString;
  end?: boolean;
  conc?: boolean;
  desc?: AnnotatedString;
  stacking?: boolean;
  save_as?: string;
  parent?: string;
}

export interface PassiveEffects {
  attack_advantage?: IntExpression;
  to_hit_bonus?: AnnotatedString;
  damage_bonus?: AnnotatedString;
  magical_damage?: IntExpression;
  silvered_damage?: IntExpression;
  resistances?: AnnotatedString[];
  immunities?: AnnotatedString[];
  vulnerabilities?: AnnotatedString[];
  ignored_resistances?: AnnotatedString[];
  ac_value?: IntExpression;
  ac_bonus?: IntExpression;
  max_hp_value?: IntExpression;
  max_hp_bonus?: IntExpression;
  save_bonus?: AnnotatedString;
  save_adv?: AnnotatedString[];
  save_dis?: AnnotatedString[];
  check_bonus?: AnnotatedString;
  check_adv?: AnnotatedString[];
  check_dis?: AnnotatedString[];
  dc_bonus?: IntExpression
}

export interface AttackInteraction {
  attack: CharacterAttack;
  defaultDC?: IntExpression;
  defaultAttackBonus?: IntExpression;
  defaultCastingMod?: IntExpression;
}

export interface ButtonInteraction {
  automation: AutomationEffect[];
  label: AnnotatedString;
  verb?: AnnotatedString;
  style?: IntExpression;
  defaultDC?: IntExpression;
  defaultAttackBonus?: IntExpression;
  defaultCastingMod?: IntExpression;
}

export interface IEffect extends AutomationEffect {
  type: 'ieffect2';
  name: AnnotatedString;
  duration?: number | IntExpression;
  effects?: PassiveEffects;
  attacks?: AttackInteraction[];
  buttons?: ButtonInteraction[];
  end?: boolean;
  conc?: boolean;
  desc?: AnnotatedString;
  stacking?: boolean;
  save_as?: string;
  parent?: string;
  target_self?: boolean;
  tick_on_caster?: boolean;
}

export interface RemoveIEffect extends AutomationEffect {
  type: 'remove_ieffect';
  removeParent?: 'always' | 'if_no_children';
}

export interface Roll extends AutomationEffect {
  type: 'roll';
  dice: AnnotatedString;
  name: string;
  higher?: HigherLevels;
  cantripScale?: boolean;
  hidden?: boolean;
  displayName?: string;
  fixedValue?: boolean;
}

export interface Text extends AutomationEffect {
  type: 'text';
  text: AnnotatedString | AbilityReference;
  title?: string;
}

export interface SetVariable extends AutomationEffect {
  type: 'variable';
  name: string;
  value: IntExpression;
  higher?: HigherLevels<IntExpression>;
  onError?: IntExpression;
}

export interface Condition extends AutomationEffect {
  type: 'condition';
  condition: IntExpression;
  onTrue: AutomationEffect[];
  onFalse: AutomationEffect[];
  errorBehaviour?: 'true' | 'false' | 'both' | 'neither' | 'raise';
}

export interface SpellSlotReference {
  slot: number | IntExpression;
}

export interface AbilityReference {
  id: number;
  typeId: number;
}

export interface UseCounter extends AutomationEffect {
  type: 'counter';
  counter: string | SpellSlotReference | AbilityReference;
  amount: IntExpression;
  allowOverflow?: boolean;
  errorBehaviour?: 'warn' | 'raise' | 'ignore';
  fixedValue?: boolean;
}


export interface CastSpell extends AutomationEffect {
  type: 'spell';
  id: number;
  level?: number;
  dc?: IntExpression;
  attackBonus?: IntExpression;
  castingMod?: IntExpression;
  parent?: string;
}

export interface AbilityCheck extends AutomationEffect {
  type: 'check';
  ability: string | string[];
  contestAbility?: string | string[];
  dc?: IntExpression;
  success?: AutomationEffect[];
  fail?: AutomationEffect[];
  contestTie?: 'fail' | 'success' | 'neither';
  adv?: -1 | 0 | 1;
}
