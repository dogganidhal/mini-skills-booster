import {catchError, tap} from "rxjs/operators";
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../../models/user.dto";
import {SignUpRequest} from "../../models/sign-up.dto";
import {LoginRequest} from "../../models/login.dto";
import {Credentials} from "../../models/credentials.dto";
import {environment} from "../../../environments/environment";
import {BaseService} from "../index";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  private static CREDENTIALS_KEY = "@mini-skills-booster/credentials";

  private isConnectedBS: BehaviorSubject<boolean>;

  public get credentials(): Credentials | undefined {
    console.log('read');
    const json = localStorage.getItem(AuthService.CREDENTIALS_KEY);
    return json && JSON.parse(json);
  }
  public set credentials(value: Credentials | undefined) {
    if (value) {
      this.isConnectedBS.next(true);
      localStorage.setItem(AuthService.CREDENTIALS_KEY, JSON.stringify(value));
    } else {
      this.isConnectedBS.next(false);
    }
  }

  public isConnected: Observable<boolean>;
  public get connected(): boolean {
    return this.credentials !== undefined;
  }

  constructor(private httpClient: HttpClient) {
    super();
    this.isConnectedBS = new BehaviorSubject<boolean>(this.credentials !== null);
    this.isConnected = this.isConnectedBS.asObservable();
  }

  public login(request: LoginRequest): Observable<Credentials> {
    return this.httpClient
      .post<Credentials>(`${environment.apiUrl}/auth/login`, request)
      .pipe(
        tap(credentials => this.credentials = credentials),
        catchError(this.handleError.bind(this))
      );
  }

  public signUp(request: SignUpRequest): Observable<User> {
    return this.httpClient
      .post<User>(`${environment.apiUrl}/auth/signup`, request)
      .pipe(catchError(this.handleError.bind(this)));
  }

  public refreshCredentials(refreshToken: string): Promise<Credentials> {
    return this.httpClient
      .post<Credentials>(`${environment.apiUrl}/auth/refresh`, { refreshToken })
      .pipe(
        tap(credentials => this.credentials = credentials),
        catchError(this.handleError.bind(this))
      )
      .toPromise();
  }

}
