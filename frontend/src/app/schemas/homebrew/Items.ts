import {DiscordUser} from '../DiscordUser';

export const REQUIRED_ITEM_PROPS = ['name'];

export class Pack {
  name: string;
  owner: DiscordUser;
  editors: DiscordUser[];
  public: boolean;
  active: string[];
  server_active: string[];
  desc: string;
  image: string;
  items?: Item[];
  numItems?: number;
  _id: { '$oid': string };
}

export class Item {
  name: string;
  meta: string;
  desc: string;
  image?: string;

  constructor() {
    this.name = 'New Item';
    this.meta = '';
    this.desc = '';
  }
}

export class StructuredItem extends Item {

}
