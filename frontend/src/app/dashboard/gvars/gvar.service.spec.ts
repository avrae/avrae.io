import { TestBed, inject } from '@angular/core/testing';

import { GvarService } from './gvar.service';

describe('GvarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GvarService]
    });
  });

  it('should be created', inject([GvarService], (service: GvarService) => {
    expect(service).toBeTruthy();
  }));
});
