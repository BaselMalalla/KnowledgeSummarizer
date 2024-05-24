import { TestBed } from '@angular/core/testing';

import { CombService } from './comb.service';

describe('CombService', () => {
  let service: CombService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CombService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
