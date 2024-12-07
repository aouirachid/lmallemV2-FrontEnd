import { Inject, Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { User } from '../Models/User';
import { LoginUser } from '../Models/LoginUser';
import { ENVIRONMENT } from '../environment.provider';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<LoginUser | null>;
  public currentUser: Observable<LoginUser | null>;
  constructor(
    private httpClient: HttpClient,
    @Inject(ENVIRONMENT) private env: any
  ) {
    this.currentUserSubject = new BehaviorSubject<LoginUser | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoginUser | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<LoginUser> {
    return this.httpClient
      .post<any>(`${this.env.apiUrl}/login`, { email, password })
      .pipe(
        map((response) => {
          if (response && response.authorisation.token) {
            const loginUser: LoginUser = {
              id: response.user.id,
              name: response.user.name,
              email: response.user.email,
              token: response.authorisation.token,
            };
            localStorage.setItem('currentUser', JSON.stringify(loginUser));
            this.currentUserSubject.next(loginUser);
            return loginUser;
          }
          throw new Error('Login failed');
        })
      );
  }

  register(
    name: string,
    email: string,
    password: string
  ): Observable<LoginUser> {
    return this.httpClient
      .post<any>(`${this.env.apiUrl}/register`, { name, email, password })
      .pipe(
        map((response) => {
          if (response && response.authorisation.token) {
            const loginUser: LoginUser = {
              id: response.user.id,
              name: response.user.name,
              email: response.user.email,
              token: response.authorisation.token,
            };
            localStorage.setItem('currentUser', JSON.stringify(loginUser));
            this.currentUserSubject.next(loginUser);
            return loginUser;
          }
          throw new Error('Registration failed');
        })
      );
  }

  logout(): Observable<any> {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    return this.httpClient.post<any>(`${this.env.apiUrl}/logout`, {});
  }
}
