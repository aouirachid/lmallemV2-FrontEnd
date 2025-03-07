import { Inject, Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Service } from '../Models/Service';
import { ENVIRONMENT } from '../environment.provider';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  urlApi: string = `${this.env.apiUrl}/services`;

  constructor(
    private htttpClient: HttpClient,
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

  addService(formData: FormData): Observable<any> {
    return this.htttpClient
      .post(this.urlApi, formData, { headers: this.getAuthHeaders(true) })
      .pipe(catchError(this.handleError));
  }

  getServices(): Observable<any> {
    return this.htttpClient.get(this.urlApi, {
      headers: this.getAuthHeaders(),
    });
  }

  getService(id: any): Observable<Service> {
    let API_URL = `${this.urlApi}/${id}`;
    return this.htttpClient
      .get<{ service: Service }>(API_URL, { headers: this.getAuthHeaders() })
      .pipe(
        map((res: { service: Service }) => res.service),
        catchError(this.handleError)
      );
  }

  updateService(id: any, formData: FormData): Observable<any> {
    const API_URL = `${this.urlApi}/${id}`;
    return this.htttpClient
      .post(API_URL, formData, { headers: this.getAuthHeaders(true) })
      .pipe(catchError(this.handleError));
  }
  // updateService(id: any, formData: FormData): Observable<any> {
  //   const API_URL = `${this.urlApi}/${id}`;
  //   return this.htttpClient
  //     .post(API_URL, formData, {
  //       headers: new HttpHeaders({ Accept: 'application/json' }),
  //       reportProgress: true,
  //       observe: 'events',
  //     })
  //     .pipe(catchError(this.handleError));
  // }

  deleteService(id: any): Observable<any> {
    let API_URL = `${this.urlApi}/${id}`;
    return this.htttpClient
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
