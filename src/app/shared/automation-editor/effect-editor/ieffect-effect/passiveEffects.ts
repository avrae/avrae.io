import {PassiveEffects} from '../../types';

type PassiveEffectType = 'annotatedstring' | 'intexpression';
const AnnotatedString = 'annotatedstring';
const IntExpression = 'intexpression';

// utility consts
const DAMAGE_TYPES = [
  {name: 'Bludgeoning', value: 'bludgeoning'},
  {name: 'Piercing', value: 'piercing'},
  {name: 'Slashing', value: 'slashing'},
  {name: 'Acid', value: 'acid'},
  {name: 'Cold', value: 'cold'},
  {name: 'Fire', value: 'fire'},
  {name: 'Force', value: 'force'},
  {name: 'Lightning', value: 'lightning'},
  {name: 'Necrotic', value: 'necrotic'},
  {name: 'Poison', value: 'poison'},
  {name: 'Psychic', value: 'psychic'},
  {name: 'Radiant', value: 'radiant'},
  {name: 'Thunder', value: 'thunder'},
];

const SAVING_THROWS = [
  {name: 'All', value: 'all'},
  {name: 'Strength', value: 'str'},
  {name: 'Dexterity', value: 'dex'},
  {name: 'Constitution', value: 'con'},
  {name: 'Intelligence', value: 'int'},
  {name: 'Wisdom', value: 'wis'},
  {name: 'Charisma', value: 'cha'},
];

const SKILL_NAMES = [
  {name: 'All', value: 'all'},
  {name: 'Acrobatics', value: 'acrobatics'},
  {name: 'Animal Handling', value: 'animalHandling'},
  {name: 'Arcana', value: 'arcana'},
  {name: 'Athletics', value: 'athletics'},
  {name: 'Deception', value: 'deception'},
  {name: 'History', value: 'history'},
  {name: 'Initiative', value: 'initiative'},
  {name: 'Insight', value: 'insight'},
  {name: 'Intimidation', value: 'intimidation'},
  {name: 'Investigation', value: 'investigation'},
  {name: 'Medicine', value: 'medicine'},
  {name: 'Nature', value: 'nature'},
  {name: 'Perception', value: 'perception'},
  {name: 'Performance', value: 'performance'},
  {name: 'Persuasion', value: 'persuasion'},
  {name: 'Religion', value: 'religion'},
  {name: 'Sleight of Hand', value: 'sleightOfHand'},
  {name: 'Stealth', value: 'stealth'},
  {name: 'Survival', value: 'survival'},
  {name: 'Strength', value: 'strength'},
  {name: 'Dexterity', value: 'dexterity'},
  {name: 'Constitution', value: 'constitution'},
  {name: 'Intelligence', value: 'intelligence'},
  {name: 'Wisdom', value: 'wisdom'},
  {name: 'Charisma', value: 'charisma'},
];

// ==== passive effects ====
export interface PassiveEffectDef {
  name: string;
  // used to render either the intexpression help or annotatedstring help for custom values
  type: PassiveEffectType;
  // allow adding multiple of this passive effect
  isList?: boolean;
  // if set, default to the first default option and allow the user to choose between any of these or an expression
  defaultOptions?: { name: string, value: string }[];
}

type PassiveEffectMap = {
  [key in keyof PassiveEffects]: PassiveEffectDef;
};

export const PASSIVE_EFFECTS: PassiveEffectMap = {
  attack_advantage: {
    name: 'Attack Advantage',
    type: IntExpression,
    defaultOptions: [
      {name: 'Flat', value: '0'},
      {name: 'Advantage', value: '1'},
      {name: 'Disadvantage', value: '-1'},
      {name: 'Elven Accuracy', value: '2'}
    ]
  },
  to_hit_bonus: {
    name: 'To Hit Bonus',
    type: AnnotatedString
  },
  damage_bonus: {
    name: 'Damage Bonus',
    type: AnnotatedString
  },
  magical_damage: {
    name: 'Magical Damage',
    type: IntExpression,
    defaultOptions: [{name: 'True', value: '1'}]
  },
  silvered_damage: {
    name: 'Silvered Damage',
    type: IntExpression,
    defaultOptions: [{name: 'True', value: '1'}]
  },
  resistances: {
    name: 'Resistance',
    type: AnnotatedString,
    isList: true,
    defaultOptions: DAMAGE_TYPES
  },
  immunities: {
    name: 'Immunity',
    type: AnnotatedString,
    isList: true,
    defaultOptions: DAMAGE_TYPES
  },
  vulnerabilities: {
    name: 'Vulnerability',
    type: AnnotatedString,
    isList: true,
    defaultOptions: DAMAGE_TYPES
  },
  ignored_resistances: {
    name: 'Ignore Resistance',
    type: AnnotatedString,
    isList: true,
    defaultOptions: DAMAGE_TYPES
  },
  ac_value: {
    name: 'Set AC',
    type: IntExpression
  },
  ac_bonus: {
    name: 'AC Bonus',
    type: IntExpression
  },
  max_hp_value: {
    name: 'Set Max HP',
    type: IntExpression
  },
  max_hp_bonus: {
    name: 'Max HP Bonus',
    type: IntExpression
  },
  save_bonus: {
    name: 'Saving Throw Bonus',
    type: AnnotatedString
  },
  save_adv: {
    name: 'Saving Throw Advantage',
    type: AnnotatedString,
    isList: true,
    defaultOptions: SAVING_THROWS
  },
  save_dis: {
    name: 'Saving Throw Disadvantage',
    type: AnnotatedString,
    isList: true,
    defaultOptions: SAVING_THROWS
  },
  check_bonus: {
    name: 'Ability Check Bonus',
    type: AnnotatedString
  },
  check_adv: {
    name: 'Ability Check Advantage',
    type: AnnotatedString,
    isList: true,
    defaultOptions: SKILL_NAMES
  },
  check_dis: {
    name: 'Ability Check Disadvantage',
    type: AnnotatedString,
    isList: true,
    defaultOptions: SKILL_NAMES
  },
  dc_bonus: {
    name: 'DC Bonus',
    type: IntExpression
  },
};


