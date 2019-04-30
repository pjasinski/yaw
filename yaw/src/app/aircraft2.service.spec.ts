import { TestBed } from '@angular/core/testing';

import { Aircraft2Service } from './aircraft2.service';

describe('Aircraft2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Aircraft2Service = TestBed.get(Aircraft2Service);
    expect(service).toBeTruthy();
  });
});
