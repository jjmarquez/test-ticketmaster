import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EventService } from './event.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { LoadingService } from '../loading/loading.service';
import { environment } from '../../../../environments/environment.development';

describe('EventService', () => {
  let service: EventService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoadingService],
    });
    service = TestBed.inject(EventService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getList should send a GET request and return a list of events', () => {
    service
      .getList(0)
      .then((res: any) => {
        expect(res).toBeDefined();
      })
      .catch((err) => {});

    const testRequest = httpMock.expectOne(
      `https://app.ticketmaster.com/discovery/v2/events?apikey=${environment.apiKey}&locale=*&page=0`
    );
    expect(testRequest.request.method).toBe('GET');
    testRequest.flush([
      { id: 1, name: 'Event 1' },
      { id: 2, name: 'Event 2' },
    ]);
  });
});
