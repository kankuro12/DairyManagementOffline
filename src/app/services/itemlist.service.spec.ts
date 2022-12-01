import { TestBed } from '@angular/core/testing';

import { ItemlistService } from './itemlist.service';

describe('ItemlistService', () => {
  let service: ItemlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
