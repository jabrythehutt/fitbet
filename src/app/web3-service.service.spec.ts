import { TestBed, inject } from '@angular/core/testing';

import { Web3ServiceService } from './web3-service.service';

describe('Web3ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Web3ServiceService]
    });
  });

  it('should be created', inject([Web3ServiceService], (service: Web3ServiceService) => {
    expect(service).toBeTruthy();
  }));
});
