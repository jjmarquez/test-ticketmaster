import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LoadingService } from '../loading/loading.service';
import { IDataFilter } from '../../models/events';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private httpClient = inject(HttpClient);

  constructor(private readonly loadingService: LoadingService) {}

  getList(page: number, filter?: IDataFilter): Promise<any> {
    this.loadingService.loadingOn();
    let options = {
      params: {
        locale: '*',
        page,
        ...filter,
      },
    };
    return firstValueFrom(
      this.httpClient.get<any>(
        `https://app.ticketmaster.com/discovery/v2/events?apikey=${environment.apiKey}`,
        options
      )
    )
      .then((res) => {
        this.loadingService.loadingOff();
        return res;
      })
      .catch((err) => {
        this.loadingService.loadingOff();
      });
  }
}
