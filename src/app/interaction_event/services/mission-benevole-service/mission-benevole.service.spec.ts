import { TestBed } from '@angular/core/testing';

import { MissionBenevoleService } from './mission-benevole.service';

describe('MissionBenevoleService', () => {
  let service: MissionBenevoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MissionBenevoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
