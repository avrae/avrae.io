import { TestBed } from '@angular/core/testing';

import { DiscordService } from './discord.service';

describe('DiscordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiscordService = TestBed.get(DiscordService);
    expect(service).toBeTruthy();
  });
});
