import { Component, Input, OnInit, inject } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { provideNativeDateAdapter } from '@angular/material/core';

import { CommonModule, ViewportScroller } from '@angular/common';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatCardModule, MatButtonModule],
  providers: [EventService, provideNativeDateAdapter()],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
})
export class EventListComponent implements OnInit {
  private readonly viewport = inject(ViewportScroller);

  @Input('listEvents') listEvents: Array<any> = [];

  constructor(public readonly loadingService: LoadingService) {}

  ngOnInit(): void {}

  goToLink(url: string) {
    window.open(url, '_blank');
  }
}
