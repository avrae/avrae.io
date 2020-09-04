export enum PublicationState {
  PRIVATE = 'PRIVATE',
  UNLISTED = 'UNLISTED',
  PUBLISHED = 'PUBLISHED'
}

export class WorkshopCollection {
  _id: string;
  name: string;
  description: string;
  image: string | null;
  owner: string;
  alias_ids: string[];
  snippet_ids: string[];
  publish_state: PublicationState;
  num_subscribers: number;
  num_guild_subscribers: number;
  last_edited: string; // ISO8601 date
  created_at: string; // ISO8601 date
  tags: string[];
}

export class WorkshopCollectionFull extends WorkshopCollection {
  aliases: WorkshopAliasFull[];
  snippets: WorkshopSnippet[];
}

export abstract class WorkshopCollectable {
  _id: string;
  name: string;
  code: string;
  versions: CodeVersion[];
  docs: string;
  entitlements: WorkshopEntitlement[];
  collection_id: string;
}

export class WorkshopAlias extends WorkshopCollectable {
  subcommand_ids: string[];
  parent_id: string | null;
}

export class WorkshopAliasFull extends WorkshopAlias {
  subcommands: WorkshopAliasFull[];
}

// no extra fields, just not abstract
export class WorkshopSnippet extends WorkshopCollectable {
}

export class WorkshopTag {
  slug: string;
  name: string;
  category: string;
}

export class WorkshopBindings {
  alias_bindings: { name: string, id: string }[];
  snippet_bindings: { name: string, id: string }[];
}

export class WorkshopSubscription extends WorkshopBindings {
  _id: string;
  object_id: string;
  subscriber_id: number;
  type: string;
}

export class CodeVersion {
  version: number;
  content: string;
  created_at: string; // ISO8601
  is_current: boolean;
}

export class WorkshopEntitlement {
  entity_type: string;
  entity_id: number;
  required: boolean;
}

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

// helper enums, not exposed in api
export enum CollectableType {
  ALIAS = 'ALIAS',
  SNIPPET = 'SNIPPET',
  SUBALIAS = 'SUBALIAS',
  SUBCOMMAND = SUBALIAS
}
