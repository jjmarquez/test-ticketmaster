import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventComponent } from './event.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EventService } from '../../shared/services/event/event.service';
import { environment } from '../../../environments/environment.development';
import { IDataFilter } from '../../shared/models/events';

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;
  let httpMock: HttpTestingController;
  let service: EventService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        EventComponent,
        HttpClientTestingModule,
      ],
      providers: [EventService],
    }).compileComponents();

    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(EventService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch events and update component properties', () => {
    const pageNumber = 0;
    const filter = {
      keyword: 'test',
    };

    service.getList(pageNumber, filter).then((res: any) => {
      expect(res).toBeDefined();
    });

    const testRequest = httpMock.expectOne(
      `https://app.ticketmaster.com/discovery/v2/events?apikey=${environment.apiKey}&locale=*&page=0&keyword=test`
    );
    expect(testRequest.request.method).toBe('GET');
    testRequest.flush([
      { id: 1, name: 'Event 1' },
      { id: 2, name: 'Event 2' },
    ]);
  });

  it('should update filter and reset pager when setting a new filter', () => {
    const newFilter: IDataFilter = {
      keyword: '',
    };
    spyOn(component, 'getList');
    component.setFilter(newFilter);

    expect(component.filter).toEqual(newFilter);
    expect(component.pager).toEqual({
      number: 0,
      size: 0,
      totalElements: 0,
      totalPages: 0,
    });
    expect(component.getList).toHaveBeenCalledWith(0, newFilter);
  });
});
