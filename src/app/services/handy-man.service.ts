import { Inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { ENVIRONMENT } from '../environment.provider';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HandyManService {
  constructor(
    private httpClient: HttpClient,
    @Inject(ENVIRONMENT) private env: any
  ) {}
  urlApi: string = `${this.env.apiUrl}/handy-men`;

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

  addHandyMan(formData: FormData): Observable<any> {
    const API_URL = `${this.urlApi}`;
    return this.httpClient
      .post(API_URL, formData, { headers: this.getAuthHeaders(true) }) // Pass true for FormData
      .pipe(catchError(this.handleError));
  }

  getHandyMen(): Observable<any> {
    return this.httpClient
      .get(this.urlApi, { headers: this.getAuthHeaders() }) // Add headers here
      .pipe(catchError(this.handleError));
  }

  getHandyMan(id: any): Observable<any> {
    let API_URL = `${this.urlApi}/${id}`;
    return this.httpClient
      .get(API_URL, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateHandyMan(id: any, formData: FormData): Observable<any> {
    let API_URL = `${this.urlApi}/${id}`;
    return this.httpClient
      .post(API_URL, formData, { headers: this.getAuthHeaders(true) })
      .pipe(catchError(this.handleError));
  }

  deleteHandyMan(id: any): Observable<any> {
    let API_URL = `${this.urlApi}/${id}`;
    return this.httpClient
      .delete(API_URL, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
