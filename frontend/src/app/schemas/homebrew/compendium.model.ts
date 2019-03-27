import {DiscordUser} from '../DiscordUser';
import {Background} from './background.model';
import {CharacterClass} from './character-class.model';
import {Feat} from './feat.model';
import {Item} from './item.model';
import {Monster} from './monster.model';
import {Race} from './race.model';
import {Spell} from './spell.model';

export class Compendium {
  // metadata
  name: string;
  owner: DiscordUser;
  editors: DiscordUser[];
  subscribers: DiscordUser[];
  public: boolean;
  active: string[];
  server_active: string[];
  desc: string;
  image: string;
  created: number;
  lastEdit: number;

  // MongoDB id
  _id: { '$oid': string };

  // actual user content
  backgrounds?: Background[];
  characterClasses?: CharacterClass[];
  feats?: Feat[];
  items?: Item[];
  monsters?: Monster[];
  races?: Race[];
  spells?: Spell[];

  // social/sharing features
  comments?: Comment[];
  /**
   * A list of users who have starred this Compendium.
   * Starring a compendium lets you get back to it easier from a "Starred" tab (TODO)
   */
  stargazers?: DiscordUser[];
}

class Comment {
  author: DiscordUser;
  text: string;
  timestamp: number;
}
