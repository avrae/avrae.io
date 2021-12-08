import {DiscordUser} from '../Discord';
import {AutomationEffect} from './AutomationEffects';

export const REQUIRED_SPELL_PROPS = ['name', 'level', 'school'];
export const SPELL_SCHOOLS = ['A', 'V', 'E', 'I', 'D', 'N', 'T', 'C'];

export class Tome {
  name: string;
  owner: string;
  public: boolean;
  desc: string;
  image: string;
  spells?: Spell[];
  numSpells?: number;
  _id: string;
}

export class Spell {
  name: string;
  level: number;
  school: string;
  classes: string;
  subclasses: string;
  casttime: string;
  range: string;
  components: SpellComponents;
  duration: string;
  ritual: boolean;
  description: string;
  higherlevels: string;
  concentration: boolean;
  automation: AutomationEffect[] | null;
  image?: string;

  constructor() {
    this.name = 'New Spell';
    this.level = 1;
    this.school = 'A';
    this.classes = '';
    this.subclasses = '';
    this.casttime = '';
    this.range = '';
    this.components = new SpellComponents();
    this.duration = '';
    this.ritual = false;
    this.description = '';
    this.higherlevels = '';
    this.concentration = false;
    this.automation = [];
  }
}

export class SpellComponents {
  verbal: boolean;
  somatic: boolean;
  material: string;

  constructor() {
    this.verbal = false;
    this.somatic = false;
    this.material = '';
  }
}

export function parseLevel(level) {
  if (level == 0) return 'Cantrip';
  else if (level == 1) return '1st level';
  else if (level == 2) return '2nd level';
  else if (level == 3) return '3rd level';
  return `${level}th level`;
}

export function parseSchool(school) {
  if (school == 'A') return 'Abjuration';
  else if (school == 'V') return 'Evocation';
  else if (school == 'E') return 'Enchantment';
  else if (school == 'I') return 'Illusion';
  else if (school == 'D') return 'Divination';
  else if (school == 'N') return 'Necromancy';
  else if (school == 'T') return 'Transmutation';
  else if (school == 'C') return 'Conjuration';
  return school;
}

export function parseComponents(spell) {
  let components = [];
  if (spell.components.verbal)
    components.push('V');
  if (spell.components.somatic)
    components.push('S');
  if (spell.components.material)
    components.push(`M (${spell.components.material})`);
  return components.join(', ');
}
