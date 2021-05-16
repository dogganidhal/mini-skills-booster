import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../../services/auth/auth.service";
import {mergeMap} from "rxjs/operators";
import {fromPromise} from "rxjs/internal-compatibility";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return fromPromise(this.handleRequest(request, next));
  }

  private async handleRequest(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    let authenticatedRequest = request;
    let credentials = this.authService.credentials;
    if (this.authService.connected && credentials !== null) {
      authenticatedRequest = AuthInterceptor.adaptRequest(request, credentials.token);
    }
    return next.handle(authenticatedRequest).toPromise();
  }

  private static adaptRequest(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });
  }

}
