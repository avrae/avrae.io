import {DiscordUser} from "../DiscordUser";

export const REQUIRED_SPELL_PROPS = ["name"];

export class Tome {
  name: string;
  owner: DiscordUser;
  editors: DiscordUser[];
  public: boolean;
  active: string[];
  server_active: string[];
  desc: string;
  image: string;
  spells?: Spell[];
  numSpells?: number;
  _id: { "$oid": string };
}

export class Spell {
  name: string;
  level: number;
  school: string;
  classes: string[];
  subclasses: string[];
  time: string;
  range: string;
  components: SpellComponents;
  duration: string;
  ritual: boolean;
  description: string;
  higherlevels: string;
  concentration: boolean;
  automation: SpellAutomation;
}

export class SpellComponents {
  verbal: boolean;
  somatic: boolean;
  material: string;
}

export class SpellAutomation {

}

