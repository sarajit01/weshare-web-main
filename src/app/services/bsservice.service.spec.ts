import { TestBed } from '@angular/core/testing';

import { BSServiceService } from './bsservice.service';

describe('BSServiceService', () => {
  let service: BSServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BSServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
