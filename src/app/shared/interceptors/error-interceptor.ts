import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Observable,
  catchError,
  filter,
  finalize,
  tap,
  throwError,
} from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private errorResponse?: string;

  constructor(public router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {},
        (err: HttpErrorResponse) => {
          if (err instanceof HttpErrorResponse) {
            switch (err.status) {
              case 400:
                console.log('400');
                break;
              case 401:
                console.log('401');
                console.log(
                  'Please change the apiKey inside environment.development.ts'
                );
                break;
              default:
                console.log(err);
                break;
            }
          }
        }
      )
    );
  }
}
