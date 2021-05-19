import {catchError, map, tap} from "rxjs/operators";
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../../models/user.dto";
import {SignUpRequest} from "../../models/sign-up.dto";
import {LoginRequest} from "../../models/login.dto";
import {Credentials, ExpiryAwareCredentials} from "../../models/credentials.dto";
import {environment} from "../../../environments/environment";
import {BaseService} from "../index";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  private static CREDENTIALS_KEY = "@mini-skills-booster/credentials";

  private isConnectedBS: BehaviorSubject<boolean>;

  public get credentials(): ExpiryAwareCredentials | null {
    const jsonString = localStorage.getItem(AuthService.CREDENTIALS_KEY);
    return jsonString !== null ? JSON.parse(jsonString) : null;
  }
  public set credentials(value: ExpiryAwareCredentials | null) {
    if (value !== null) {
      this.isConnectedBS.next(true);
      this.router.navigateByUrl('');
      localStorage.setItem(AuthService.CREDENTIALS_KEY, JSON.stringify(value));
    } else {
      this.isConnectedBS.next(false);
    }
  }

  public isConnected: Observable<boolean>;
  public get connected(): boolean {
    return this.credentials !== null;
  }

  constructor(httpClient: HttpClient, private router: Router) {
    super(httpClient);
    this.isConnectedBS = new BehaviorSubject<boolean>(this.credentials !== null);
    this.isConnected = this.isConnectedBS.asObservable();
  }

  public login(request: LoginRequest): Observable<ExpiryAwareCredentials> {
    return this.httpClient
      .post<Credentials>(`${environment.apiUrl}/auth/login`, request)
      .pipe(
        map(credentials => AuthService.formatCredentials(credentials)),
        tap(credentials => this.credentials = credentials),
        catchError(this.handleError.bind(this))
      );
  }

  public signUp(request: SignUpRequest): Observable<User> {
    return this.httpClient
      .post<User>(`${environment.apiUrl}/auth/signup`, request)
      .pipe(catchError(this.handleError.bind(this)));
  }

  public refreshCredentials(): Observable<ExpiryAwareCredentials> {
    if (this.credentials === null) {
      throw new Error('AuthService.refreshCredentials() with while no user being authenticated');
    }
    return this.httpClient
      .post<Credentials>(`${environment.apiUrl}/auth/refresh`, { refreshToken: this.credentials.refreshToken })
      .pipe(
        map(credentials => AuthService.formatCredentials(credentials)),
        tap(credentials => {
          this.credentials = credentials;
          console.log('credentials: ', credentials)
        }),
        catchError(this.handleError.bind(this))
      );
  }

  public logout() {
    localStorage.removeItem(AuthService.CREDENTIALS_KEY);
    this.credentials = null;
  }

  private static formatCredentials(credentials: Credentials): ExpiryAwareCredentials {
    return {
      ...credentials,
      expiresAt: Date.now() + credentials.expiresIn
    };
  }

}
