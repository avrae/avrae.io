type Ability = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';

export class CharacterClass {
  /**
   * The name of the class.
   */
  name: string;
  /**
   * The size of one hit die.
   */
  hitdie: number; // should this be a string?
  /**
   * What saving throw proficiencies the class gets.
   */
  saveProfs: Ability[];
  /**
   * The starting skill proficiencies the class gets.
   */
  skillProfs: { armor: string, weapons: string, tools: string, skills: string };
  /**
   * The starting equipment the class gets.
   */
  startingEquipment: { default: string, goldAlternative: string };
  /**
   * The features associated with this class.
   */
  features: CharacterClassFeature[];
  /**
   * The subclasses associated with this class.
   */
  subclasses: CharacterSubclass[];

  multiclassing?: string; // optional rules players can add?
}

export class CharacterClassFeature {
  /**
   * The level a character gets this feature at.
   */
  level: number;
  /**
   * The name of the feature.
   */
  name: string;
  /**
   * The text of the feature.
   */
  text: string;
}

export class CharacterSubclass {
  /**
   * The name of the subclass.
   */
  name: string;
  /**
   * The features associated with this subclass.
   */
  features: CharacterClassFeature[];
}
