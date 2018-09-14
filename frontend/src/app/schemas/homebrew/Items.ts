import {DiscordUser} from "../DiscordUser";

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
  _id: { "$oid": string };
}

export class Item {
  name: string;
  desc: string;
}
