import { Component, OnInit } from '@angular/core';
import { EventFormComponent } from '../../shared/components/event-form/event-form.component';
import { EventListComponent } from '../../shared/components/event-list/event-list.component';
import { PagerComponent } from '../../shared/components/pager/pager.component';
import { IDataFilter, IPager } from '../../shared/models/events';
import { EventService } from '../../shared/services/event/event.service';
import { LoadingService } from '../../shared/services/loading/loading.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [
    EventFormComponent,
    EventListComponent,
    PagerComponent,
    MatProgressBarModule,
  ],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent implements OnInit {
  pager: IPager = {
    number: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
  };

  filter: IDataFilter = {
    keyword: '',
  };

  listEvents: any = [];

  constructor(
    private readonly eventService: EventService,
    public readonly loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.getList(this.pager.number);
  }

  chagePage($event: any) {
    this.pager.number = $event;
    this.getList(this.pager.number, this.filter);
  }

  getList(pageNumber: number, filter?: IDataFilter) {
    this.eventService.getList(pageNumber, filter).then((res) => {
      if (res && res._embedded) {
        this.listEvents = res._embedded.events;
        this.pager = res.page;
      }
    });
  }

  setFilter(filter: IDataFilter) {
    this.filter = filter;
    this.pager = {
      number: 0,
      size: 0,
      totalElements: 0,
      totalPages: 0,
    };
    this.getList(this.pager.number, this.filter);
  }
}
