import { TestBed } from '@angular/core/testing';

import { TabBordService } from './tab-bord.service';

describe('TabBordService', () => {
  let service: TabBordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabBordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
