/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AircraftService } from './aircraft.service';

describe('AircraftService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AircraftService]
    });
  });

  it('should ...', inject([AircraftService], (service: AircraftService) => {
    expect(service).toBeTruthy();
  }));
});
