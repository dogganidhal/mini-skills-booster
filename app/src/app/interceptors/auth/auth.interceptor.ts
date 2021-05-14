import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../../services/auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authenticatedRequest = request;
    if (this.authService.connected) {
      authenticatedRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.authService.credentials?.token}`)
      })
    }
    return next.handle(authenticatedRequest);
  }
}
