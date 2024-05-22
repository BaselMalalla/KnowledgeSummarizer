import { TestBed } from '@angular/core/testing';

import { DataQueryService } from './data-query.service';

describe('DataQueryService', () => {
  let service: DataQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
