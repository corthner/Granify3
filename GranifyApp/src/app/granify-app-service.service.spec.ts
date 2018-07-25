import { TestBed, inject } from '@angular/core/testing';

import { GranifyAppServiceService } from './granify-app-service.service';

describe('GranifyAppServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GranifyAppServiceService]
    });
  });

  it('should be created', inject([GranifyAppServiceService], (service: GranifyAppServiceService) => {
    expect(service).toBeTruthy();
  }));
});
