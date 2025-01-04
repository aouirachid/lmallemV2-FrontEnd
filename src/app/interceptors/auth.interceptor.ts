import { Injectable, NgZone } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private zone: NgZone
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('401 Unauthorized detected in interceptor');
          this.authService.logout().subscribe({
            next: () => {
              console.log('Logged out successfully. Redirecting to login...');
              this.zone.run(() => {
                this.router.navigate(['/auth/login']);
              });
            },
            error: (err) => {
              console.error('Error during logout:', err);
              this.zone.run(() => {
                this.router.navigate(['/auth/login']);
              });
            },
          });
        } else if (error.status === 403) {
          console.error(
            '403 Forbidden detected. Redirecting to unauthorized...'
          );
          this.router.navigate(['/unauthorized']);
        }
        return throwError(() => error);
      })
    );
  }
}
