import { TestBed } from '@angular/core/testing';

import { PlateFoodService } from './plate-food.service';

describe('PlateFoodService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlateFoodService = TestBed.get(PlateFoodService);
    expect(service).toBeTruthy();
  });
});
