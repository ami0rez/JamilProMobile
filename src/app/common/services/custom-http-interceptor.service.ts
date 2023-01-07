import { NotificationService } from './notification.service';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { AuthenticationService } from './authentication.service';
import { HttpRequestsService } from './http-requests.service';
import { ErrorMessagesService } from './error-messages.service';
@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(
    private errorService: ErrorService,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private httpRequestsService: HttpRequestsService,
    private errorMessagesService: ErrorMessagesService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue(),
    });
    const clonedRequest = request.clone({ headers });

    return next.handle(clonedRequest).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.httpRequestsService.error(error);
        console.log(error);

        let data = {};
        if (error && error.error && error.error.type === 'ResponseException') {
          data = this.treatErrorMessage(error);
          this.errorService.showServerErrors(data);
        } else if (error && error.status === 401) {
          data = {
            reason: this.errorMessagesService.error401,
            status: this.errorMessagesService.error,
          };
          this.errorService.showErrors(data);
        } else if (error && error.status === 403) {
          data = {
            reason: this.errorMessagesService.error403,
            status: this.errorMessagesService.error,
          };
          this.errorService.showErrors(data);
        } else if (error && error.status === 440) {
          this.authService.logout();
        } else if (error && error.status === 500) {
          data = {
            reason: this.errorMessagesService.error500,
            status: this.errorMessagesService.error,
          };
          this.errorService.showErrors(data);
        } else if (error && error.status === 504) {
          data = {
            reason: this.errorMessagesService.error504,
            status: this.errorMessagesService.error,
          };
          this.errorService.showErrors(data);
        } else if (error && error.status === 0) {
          this.notificationService.showError(error.message);
          data = {
            reason: this.errorMessagesService.error0,
            status: this.errorMessagesService.error,
          };
          this.errorService.showErrors(data);
        } else {
          if (error && error.error && error.error.message) {
            data = {
              reason: error.error.message,
              status: error.status,
            };
          } else if (error && error.statusText) {
            data = {
              reason: error.statusText,
              status: error.status,
            };
          }
          this.errorService.showErrors(data);
        }
        return throwError(error);
      })
    );
  }

  format(text: string, list: string[]): string {
    return this.treatMessage(text).replace(/{(\d+)}/g, (match, num) => {
      return typeof list[num] !== 'undefined'
        ? this.treatMessage(list[num])
        : match;
    });
  }

  formatMultiple(text: string, list: string): string {
    return this.treatMessage(text).replace(/{(\d+)}/g, (match) => {
      return typeof list !== 'undefined' ? this.treatMessage(list) : match;
    });
  }

  treatMessage(text: string): string {
    let textModified = '';
    text
      .split('.')
      .map((str, index) => {
        if (str.includes('-')) {
          const textDashed = str.split('-');
          str = textDashed
            .map((dahsText, dashedIndex) =>
              dashedIndex === 0
                ? dahsText
                : dahsText.charAt(0).toUpperCase() + dahsText.slice(1)
            )
            .join('');
        }
        if (index !== 0) {
          textModified =
            textModified + str.charAt(0).toUpperCase() + str.slice(1);
        } else {
          textModified = textModified + str;
        }
      })
      .join();
    let errorMessage = this.errorMessagesService[textModified];
    if (!errorMessage) {
      errorMessage = text;
    }
    return errorMessage;
  }

  treatErrorMessage(error: HttpErrorResponse) {
    let reason = '';
    if (
      error.error.multiple === true &&
      error.error.params &&
      error.error.params.length > 0
    ) {
      const param = error.error.params[0]
        .map((it) => this.treatMessage(it))
        .join(', ');
      reason = this.formatMultiple(error.error.message, param);
    } else {
      reason = this.format(error.error.message, error.error.params);
    }
    const data = {
      reason,
      status: error.error.severity,
    };
    return data;
  }
}
