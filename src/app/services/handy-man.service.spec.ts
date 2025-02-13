import { TestBed } from '@angular/core/testing';

import { HandyManService } from './handy-man.service';

describe('HandyManService', () => {
  let service: HandyManService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandyManService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
