import { DiscordEmbedModule } from './discord-embed.module';

describe('DiscordEmbedModule', () => {
  let discordEmbedModule: DiscordEmbedModule;

  beforeEach(() => {
    discordEmbedModule = new DiscordEmbedModule();
  });

  it('should create an instance', () => {
    expect(discordEmbedModule).toBeTruthy();
  });
});
