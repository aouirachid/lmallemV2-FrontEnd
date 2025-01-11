import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ENVIRONMENT } from '../environment.provider';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Client } from '../Models/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  urlApi: string = `${this.env.apiUrl}/clients`;
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

  addClient(data: Client): Observable<any> {
    let API_URL = `${this.urlApi}`;
    return this.httpClient
      .post(API_URL, data, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  getClients() {
    return this.httpClient.get(this.urlApi, { headers: this.getAuthHeaders() });
  }

  getClient(id: any): Observable<Client> {
    let API_URL = `${this.urlApi}/${id}`;
    return this.httpClient
      .get<{ client: Client }>(API_URL, { headers: this.getAuthHeaders() })
      .pipe(
        map((res: { client: Client }) => res.client),
        catchError(this.handleError)
      );
  }

  updateClient(id: any, data: Client): Observable<any> {
    let API_URL = `${this.urlApi}/${id}`;
    return this.httpClient
      .put(API_URL, data, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  deleteClient(id: any): Observable<any> {
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
      errorMessage = `Error code : ${error.status}\n Message ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
