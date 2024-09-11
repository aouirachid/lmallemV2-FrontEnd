import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AdminPanel } from '../Models/AdminPanel';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {
  urlApi: string = 'http://lmallemv2.test/lmallem-backend/public/api/admin-panels';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  addAdminPanel(formData: FormData): Observable<any> {
    let API_URL = `${this.urlApi}`;
    return this.httpClient.post(API_URL, formData).pipe(catchError(this.handleError));
  }

  getAdminPanels() {
    return this.httpClient.get(this.urlApi);
  }

  getAdminPanel(id: any): Observable<any> {
    let API_URL = `${this.urlApi}/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  updateAdminPanel(id: any, data: any): Observable<any> {
    let API_URL = `${this.urlApi}/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders }).pipe(catchError(this.handleError));
  }

  deleteAdminPanel(id: any): Observable<any> {
    let API_URL = `${this.urlApi}/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders }).pipe(catchError(this.handleError));
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