import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with loading set to false', () => {
    expect(service.loading()).toBeFalse();
  });

  it('should set loading to true when calling loadingOn', () => {
    service.loadingOn();
    expect(service.loading()).toBeTrue();
  });

  it('should set loading to false when calling loadingOff', () => {
    service.loadingOff();
    expect(service.loading()).toBeFalse();
  });
});
