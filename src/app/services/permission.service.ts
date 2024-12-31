import { Inject, Injectable } from '@angular/core';
import { Permission } from '../Models/Permission';
import { catchError, map } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { ENVIRONMENT } from '../environment.provider';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  urlApi: string = `${this.env.apiUrl}/permissions`;

  constructor(
    private httpClient: HttpClient,
    @Inject(ENVIRONMENT) private env: any
  ) {}

  // Helper function to get Authorization headers
  private getAuthHeaders(): HttpHeaders {
    const tokenData = localStorage.getItem('currentUser');
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    if (tokenData) {
      const token = JSON.parse(tokenData).token; // Extract token from localStorage
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Add permission
  addPermission(data: Permission): Observable<any> {
    const API_URL = `${this.urlApi}`;
    return this.httpClient
      .post(API_URL, data, { headers: this.getAuthHeaders() }) // Include headers
      .pipe(catchError(this.handleError));
  }

  // Get all permissions
  getPermissions(): Observable<any> {
    return this.httpClient
      .get(this.urlApi, { headers: this.getAuthHeaders() }) // Include headers
      .pipe(catchError(this.handleError));
  }

  // Get a single permission
  getPermission(id: any): Observable<Permission> {
    const API_URL = `${this.urlApi}/${id}`;
    return this.httpClient
      .get<{ permission: Permission }>(API_URL, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map((res: { permission: Permission }) => res.permission),
        catchError(this.handleError)
      );
  }

  // Update permission
  updatePermission(id: any, data: Permission): Observable<any> {
    const API_URL = `${this.urlApi}/${id}`;
    return this.httpClient
      .put(API_URL, data, { headers: this.getAuthHeaders() }) // Include headers
      .pipe(catchError(this.handleError));
  }

  // Delete permission
  deletePermission(id: any): Observable<any> {
    const API_URL = `${this.urlApi}/${id}`;
    return this.httpClient
      .delete(API_URL, { headers: this.getAuthHeaders() }) // Include headers
      .pipe(catchError(this.handleError));
  }

  // Error handling
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
