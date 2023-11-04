import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable()
export class CatchErrorInterceptor implements HttpInterceptor {

  constructor() {}

  private messageService = inject(MessageService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError(error => {
          if(error.status === 401 || error.status === 403) {
            console.log(error);
            return throwError(() => error);
          }
          this.messageService.add({
            summary: 'There was an error',
            severity: 'error'
          })
          console.log(error);
          return of(error);
        })
      );
  }
}
