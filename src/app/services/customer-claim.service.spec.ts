import { TestBed } from '@angular/core/testing';

import { CustomerClaimService } from './customer-claim.service';

describe('CustomerClaimService', () => {
  let service: CustomerClaimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerClaimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
