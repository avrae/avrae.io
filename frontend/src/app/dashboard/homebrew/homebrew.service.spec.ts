import {TestBed} from '@angular/core/testing';

import {HomebrewService} from './homebrew.service';

describe('HomebrewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomebrewService = TestBed.get(HomebrewService);
    expect(service).toBeTruthy();
  });
});
