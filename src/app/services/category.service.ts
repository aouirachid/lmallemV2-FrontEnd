import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Category } from '../Models/Category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  urlApi : string = "http://lmallemv2.test/lmallem-backend/public/api/categories";
  httpHeaders = new HttpHeaders().set('Content-Type','application/json');
  constructor(private httpClient : HttpClient) { }

  addCategory(data:Category) : Observable<any>{
    let API_URL = `${this.urlApi}`;
    return this.httpClient.post(API_URL,data).pipe(catchError(this.handleError));
  }

  getCategories(){
    return this.httpClient.get(this.urlApi);
  }

  getCategory(id: any): Observable<Category> {
    let API_URL = `${this.urlApi}/${id}`;
    return this.httpClient.get<{ category: Category }>(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: { category: Category }) => res.category),
      catchError(this.handleError)
    );
  }

  updateCategory(id : any,data:Category ): Observable<any>{
    let API_URL = `${this.urlApi}/${id}`;
    return this.httpClient.put(API_URL,data,{headers:this.httpHeaders}).pipe(catchError(this.handleError));
  }

  deleteCategory(id : any): Observable<any>{
    let API_URL = `${this.urlApi}/${id}`;
    return this.httpClient.delete(API_URL,{headers:this.httpHeaders}).pipe(catchError(this.handleError));
  }

  
  
  handleError(error:HttpErrorResponse){
    let errorMessage = 'Unknown error!';
    if(error.error instanceof ErrorEvent){
      errorMessage = `Error: ${error.error.message}`
  }else{
    errorMessage = `Error code : ${error.status}\n Message ${error.message}`
  }
  console.log(errorMessage);
  return throwError(errorMessage);  
  }
}
