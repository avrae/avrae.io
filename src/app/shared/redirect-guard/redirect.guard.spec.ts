import { TestBed, async, inject } from '@angular/core/testing';

import { RedirectGuard } from './redirect.guard';

describe('RedirectGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RedirectGuard]
    });
  });

  it('should ...', inject([RedirectGuard], (guard: RedirectGuard) => {
    expect(guard).toBeTruthy();
  }));
});
