import { Inject, Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { User } from '../Models/User';
import { LoginUser } from '../Models/LoginUser';
import { ENVIRONMENT } from '../environment.provider';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<LoginUser | null>;
  public currentUser: Observable<LoginUser | null>;
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(
    private router: Router,
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
            localStorage.setItem('roles', JSON.stringify(response.roles));
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
  // logout(): Observable<any> {
  //   const token = localStorage.getItem('currentUser'); // Get the token from localStorage
  //   let headers = new HttpHeaders();

  //   if (token) {
  //     const parsedToken = JSON.parse(token); // Ensure the token is parsed correctly
  //     headers = headers.set('Authorization', `Bearer ${parsedToken.token}`);
  //   }

  //   return this.httpClient
  //     .post<any>(`${this.env.apiUrl}/logout`, {}, { headers })
  //     .pipe(
  //       tap(() => {
  //         localStorage.removeItem('currentUser');
  //         localStorage.removeItem('roles'); // Clear roles from localStorage
  //         this.currentUserSubject.next(null);
  //       })
  //     );
  // }

  logout(): Observable<any> {
    const token = localStorage.getItem('currentUser');
    let headers = new HttpHeaders();

    if (token) {
      const parsedToken = JSON.parse(token);
      headers = headers.set('Authorization', `Bearer ${parsedToken.token}`);
    }

    localStorage.removeItem('currentUser');
    localStorage.removeItem('roles');
    this.currentUserSubject.next(null);

    return this.httpClient
      .post<any>(`${this.env.apiUrl}/logout`, {}, { headers })
      .pipe(
        catchError((err) => {
          console.error('Logout API failed:', err);
          return throwError(() => err);
        })
      );
  }

  isTokenExpired(): boolean {
    const token = this.currentUserValue?.token;
    if (!token) {
      return true; // No token, treat as expired
    }

    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime; // Expired if `exp` is in the past
    } catch (error) {
      console.error('Invalid token detected', error);
      return true; // Treat invalid tokens as expired
    }
  }

  checkToken(): void {
    //console.log('Checking token...');
    if (this.isTokenExpired()) {
      //console.log('Token expired, logging out...');
      this.logout().subscribe({
        next: () => {
          this.router.navigate(['/auth/login']);
        },
        error: () => {
          console.error('Logout failed. Redirecting to login...');
          this.router.navigate(['/auth/login']);
        },
      });
    }
  }
}
