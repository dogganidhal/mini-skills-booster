import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpResponse, HttpUserEvent
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {AuthService} from "../../services/auth/auth.service";
import {catchError, map, mapTo, mergeMap, switchMap} from "rxjs/operators";
import {fromPromise} from "rxjs/internal-compatibility";
import {ExpiryAwareCredentials} from "../../models/credentials.dto";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authenticatedRequest = request;
    let credentials = this.authService.credentials;
    if (this.authService.connected && credentials !== null) {
      authenticatedRequest = AuthInterceptor.adaptRequest(request, credentials.token);
    }
    return next.handle(authenticatedRequest)
      .pipe(
        catchError((error) => {
          if (credentials !== null && error.status === 401) { // Need refreshing
            return this.authService.refreshCredentials()
              .pipe(
                mergeMap((c) => {
                  authenticatedRequest = AuthInterceptor.adaptRequest(authenticatedRequest, c.token);
                  return next.handle(authenticatedRequest);
                })
              );
          }
          return throwError(error);
        })
      );
  }

  private static adaptRequest(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });
  }

}
