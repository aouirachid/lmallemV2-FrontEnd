import { Inject, Injectable } from '@angular/core';
import { ENVIRONMENT } from '../environment.provider';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Order } from '../Models/Order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(
    private httpClient: HttpClient,
    @Inject(ENVIRONMENT) private env: any
  ) {}
  urlApi: string = `${this.env.apiUrl}/orders`;

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

  addOrder(data: Order): Observable<any> {
    let API_URL = `${this.urlApi}`;
    return this.httpClient
      .post(API_URL, data, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  getOrders() {
    return this.httpClient.get(this.urlApi, { headers: this.getAuthHeaders() });
  }

  getOrder(id: any): Observable<Order> {
    let API_URL = `${this.urlApi}/${id}`;
    return this.httpClient
      .get<{ order: Order }>(API_URL, { headers: this.getAuthHeaders() })
      .pipe(
        map((res: { order: Order }) => res.order),
        catchError(this.handleError)
      );
  }

  updateOrder(id: any, data: Order): Observable<any> {
    let API_URL = `${this.urlApi}/${id}`;
    return this.httpClient
      .put(API_URL, data, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteOrder(id: any): Observable<any> {
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
