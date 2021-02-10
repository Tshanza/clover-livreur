import { TestBed } from '@angular/core/testing';

import { AutoSignGuard } from './auto-sign.guard';

describe('AutoSignGuard', () => {
  let guard: AutoSignGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutoSignGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
