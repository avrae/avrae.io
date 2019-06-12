import {inject, TestBed} from '@angular/core/testing';

import {CustomizationService} from './customization.service';

describe('CustomizationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomizationService]
    });
  });

  it('should be created', inject([CustomizationService], (service: CustomizationService) => {
    expect(service).toBeTruthy();
  }));
});
