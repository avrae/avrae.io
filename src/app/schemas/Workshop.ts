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

