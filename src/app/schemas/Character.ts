import {AutomationEffect} from '../shared/automation-editor/types';

export class Character {
  owner: string;
  active: boolean;
  upstream: string;
  type: string;
  version: number;
  stats: Stats;
  levels: Map<string, number>;
  hp: number;
  armor: number;
  attacks: Attack[];
  skills: Skills;
  resist: string[];
  immune: string[];
  vuln: string[];
  saves: Saves;
  stat_cvars?: Map<string, any>;
  skill_effects?: Map<string, string>;
  consumables?: Consumables;
  spellbook?: Spellbook;
  live?: boolean;
}

export class CharacterMeta {
  upstream: string;
  active: boolean;
  name: string;
  description: string;
  image: string;
  levels: { total_level: number, classes: Map<string, number> };
  import_version: number;
  overrides: { desc: string, image: string, attacks: Array<any>, spells: Array<any> };
}

export class Stats {
  name: string;
  image: string;
  description: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  strengthMod: number;
  dexterityMod: number;
  constitutionMod: number;
  intelligenceMod: number;
  wisdomMod: number;
  charismaMod: number;
  proficiencyBonus: number;
}

export class Attack {
  name: string;
  automation: AutomationEffect[];
  _v: 2;
  proper?: boolean;
  verb?: string;
  phrase?: string;
  thumb?: string;
  criton?: number;
  extra_crit_damage?: string;
  activation_type?: number;

  constructor(name = '', automation: AutomationEffect[] = [], proper: boolean = false, verb: string = undefined, activation_type: number = undefined) {
    this.name = name;
    this.automation = automation;
    this._v = 2;
    this.proper = proper;
    this.verb = verb;
    this.activation_type = activation_type;
  }
}

export class Skills {
  acrobatics: number;
  animalHandling: number;
  arcana: number;
  athletics: number;
  deception: number;
  history: number;
  initiative: number;
  insight: number;
  intimidation: number;
  investigation: number;
  medicine: number;
  nature: number;
  perception: number;
  performance: number;
  persuasion: number;
  religion: number;
  sleightOfHand: number;
  stealth: number;
  survival: number;
  strengthSave: number;
  dexteritySave: number;
  constitutionSave: number;
  intelligenceSave: number;
  wisdomSave: number;
  charismaSave: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export class Saves {
  strengthSave: number;
  dexteritySave: number;
  constitutionSave: number;
  intelligenceSave: number;
  wisdomSave: number;
  charismaSave: number;
}

export class Consumables {
  custom?: Map<string, Counter>;
  hp?: Counter;
  deathsaves?: DeathSaves;
  spellslots?: SpellSlotsConsumable;
}

export class Counter {
  value: number;
  reset?: string;
  max?: number;
  min?: number;
  live?: string;
  type?: string;
}

export class DeathSaves {
  fail: Counter;
  success: Counter;
}

export class SpellSlotsConsumable {
  '1': Counter;
  '2': Counter;
  '3': Counter;
  '4': Counter;
  '5': Counter;
  '6': Counter;
  '7': Counter;
  '8': Counter;
  '9': Counter;
}

export class Spellbook {
  spellslots: SpellSlots;
  spells: string[];
  dc: number;
  attackBonus: number;
  dicecloud_id?: string;
}

export class SpellSlots {
  '1': number;
  '2': number;
  '3': number;
  '4': number;
  '5': number;
  '6': number;
  '7': number;
  '8': number;
  '9': number;
}
