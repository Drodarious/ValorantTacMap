import { TestBed } from '@angular/core/testing';

import { TacMapService } from './tac-map.service';

describe('TacMapService', () => {
  let service: TacMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TacMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
