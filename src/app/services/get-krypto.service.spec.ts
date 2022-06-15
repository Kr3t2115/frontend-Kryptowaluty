import { TestBed } from '@angular/core/testing';

import { GetKryptoService } from './get-krypto.service';

describe('GetKryptoService', () => {
  let service: GetKryptoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetKryptoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
