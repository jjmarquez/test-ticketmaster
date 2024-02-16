import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';

import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoadingService } from './shared/services/loading/loading.service';
import { ErrorInterceptor } from './shared/interceptors/error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    HttpClient,
    provideAnimationsAsync(),
    importProvidersFrom(MatSelectCountryModule.forRoot('en'), HttpClientModule),
    LoadingService,
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
};
