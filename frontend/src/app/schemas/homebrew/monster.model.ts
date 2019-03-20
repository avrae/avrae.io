type Size = 'T' | 'S' | 'M' | 'L' | 'H' | 'G';
type Ability = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
type Skill =
  'acrobatics'
  | 'animal handling'
  | 'arcana'
  | 'athletics'
  | 'deception'
  | 'history'
  | 'initiative'
  | 'insight'
  | 'intimidation'
  | 'investigation'
  | 'medicine'
  | 'nature'
  | 'perception'
  | 'performance'
  | 'persuasion'
  | 'religion'
  | 'sleight of hand'
  | 'stealth'
  | 'survival'
  | 'strength'
  | 'dexterity'
  | 'constitution'
  | 'intelligence'
  | 'wisdom'
  | 'charisma';


export class Monster {
  name: string;
  size: Size;
  /**
   * The monster's creature type (e.g. "dragon", "humanoid (goblin)")
   */
  race: string;
  alignment: string;
  ac: number;
  /**
   * e.g. "natural armor", "18 with mage armor", "chain mail, shield"
   */
  armorType: string;
  hp: number;
  /**
   * e.g. "10d8+40", "5d6+6, 45 with aid"
   */
  hitDice: string;
  speed: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  cr: string;
  xp: number;
  passivePerception: number;
  /**
   * e.g. darkvision 120ft., truesight 10ft.
   */
  senses: string;
  vuln: string[];
  resist: string[];
  immume: string[];
  condition_immune: string[];
  saves: Map<Ability, number>;
  skills: Map<Skill, number>;
  languages: string;
  traits: MonsterTrait[];
  actions: MonsterTrait[];
  reactions: MonsterTrait[];
  legactions: MonsterTrait[];
  legActionPerRound: number;
  /**
   * Whether the monster should be treated as a proper noun.
   */
  proper: boolean;
  imageUrl: string;
  spellcasting: MonsterSpellcasting;
}

class MonsterTrait {
  name: string;
  text: string;
  attacks: any[]; // TODO make unified attack automation system
}

class MonsterSpellcasting {
  spells: string[];
  dc: number;
  sab: number;
  casterLevel: number;
}
