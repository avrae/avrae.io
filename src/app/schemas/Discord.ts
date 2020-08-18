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

export function getGuildAvatarUrl(guild: PartialGuild, size: number = null): string | null {
  if (guild.icon === null) {
    return null;
  }
  let sizeQ = '';
  if (size !== null) {
    sizeQ = `?size=${size}`;
  }
  const ext = guild.icon?.startsWith('a_') ? 'gif' : 'png';
  return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${ext}${sizeQ}`;
}
