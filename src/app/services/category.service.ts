import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Category } from '../Models/Category';
import { ENVIRONMENT } from '../environment.provider';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  urlApi: string = `${this.env.apiUrl}/categories`;
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

  addCategory(data: Category): Observable<any> {
    let API_URL = `${this.urlApi}`;
    return this.httpClient
      .post(API_URL, data, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  getCategories() {
    return this.httpClient.get(this.urlApi, { headers: this.getAuthHeaders() });
  }

  getCategory(id: any): Observable<Category> {
    let API_URL = `${this.urlApi}/${id}`;
    return this.httpClient
      .get<{ category: Category }>(API_URL, { headers: this.getAuthHeaders() })
      .pipe(
        map((res: { category: Category }) => res.category),
        catchError(this.handleError)
      );
  }

  updateCategory(id: any, data: Category): Observable<any> {
    let API_URL = `${this.urlApi}/${id}`;
    return this.httpClient
      .put(API_URL, data, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteCategory(id: any): Observable<any> {
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
