export class Pack {
  name: string;
  owner: string;
  editors: string[];
  public: boolean;
  active: string[];
  server_active: string[];
  items: Item[];
  _id: { "$oid": string };
}

export class Item {
  name: string;
  desc: string;
}
