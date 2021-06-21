export class DDBEntity {
  name: string;
  source: string;
  entity_type: string;
  entity_id: number;
  type_id: number;
  entitlement_entity_type: string;
  entitlement_entity_id: number;
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
