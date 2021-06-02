export class DDBEntity {
  entity_type: string;
  name: string;
  source: string;
  entity_id: number;
  page: number | null;
  is_free: boolean;
  url: string | null;
  marketplace_url: string;
}

export class LimitedUse {
  name: string;
  type: string;
  id: number;
  typeId: number;
}
