import { Inject, Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { AdminPanel } from '../Models/AdminPanel';
import { ENVIRONMENT } from '../environment.provider';

@Injectable({
  providedIn: 'root',
})
export class AdminPanelService {
  urlApi: string = `${this.env.apiUrl}/admin-panels`;

  constructor(
    private httpClient: HttpClient,
    @Inject(ENVIRONMENT) private env: any
  ) {}

  private getAuthHeaders(isFormData = false): HttpHeaders {
    const tokenData = localStorage.getItem('currentUser');
    let headers = new HttpHeaders();

    if (tokenData) {
      const token = JSON.parse(tokenData).token;
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    if (!isFormData) {
      headers = headers.set('Content-Type', 'application/json');
    }

    return headers;
  }

  addAdminPanel(formData: FormData): Observable<any> {
    const API_URL = `${this.urlApi}`;
    return this.httpClient
      .post(API_URL, formData, { headers: this.getAuthHeaders(true) }) // Pass true for FormData
      .pipe(catchError(this.handleError));
  }

  getAdminPanels(): Observable<any> {
    return this.httpClient
      .get(this.urlApi, { headers: this.getAuthHeaders() }) // Add headers here
      .pipe(catchError(this.handleError));
  }

  getAdminPanel(id: any): Observable<any> {
    let API_URL = `${this.urlApi}/${id}`;
    return this.httpClient
      .get(API_URL, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateAdminPanel(id: any, data: any): Observable<any> {
    let API_URL = `${this.urlApi}/${id}`;
    return this.httpClient
      .put(API_URL, data, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteAdminPanel(id: any): Observable<any> {
    let API_URL = `${this.urlApi}/${id}`;
    return this.httpClient
      .delete(API_URL, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
