import { TestBed } from '@angular/core/testing';

import { CheatsheetsService } from './cheatsheets.service';

describe('CheatsheetsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheatsheetsService = TestBed.get(CheatsheetsService);
    expect(service).toBeTruthy();
  });
});
