import {inject, TestBed} from '@angular/core/testing';

import {CommandsService} from './commands.service';

describe('CommandsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommandsService]
    });
  });

  it('should be created', inject([CommandsService], (service: CommandsService) => {
    expect(service).toBeTruthy();
  }));
});
