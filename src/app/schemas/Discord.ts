export class DiscordUser {
  id: string;
  username: string;
  avatarUrl: string;
}

export class PartialGuild {
  id: string;
  name: string;
  icon: string | null;
  owner?: boolean;
  permissions?: number;
  permissions_new?: string;
}

