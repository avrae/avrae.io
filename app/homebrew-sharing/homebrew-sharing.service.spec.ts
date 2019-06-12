import {TestBed} from '@angular/core/testing';

import {HomebrewSharingService} from './homebrew-sharing.service';

describe('HomebrewSharingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomebrewSharingService = TestBed.get(HomebrewSharingService);
    expect(service).toBeTruthy();
  });
});
