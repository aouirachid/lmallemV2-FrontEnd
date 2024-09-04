import { Injectable } from '@angular/core';
import { catchError,map } from 'rxjs';
import { Observable,throwError } from 'rxjs';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Service } from '../Models/Service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  urlApi: string = 'http://lmallemv2.test/lmallem-backend/public/api/services';
  httpHeaders = new HttpHeaders().set('Content-Type','application/json');

  constructor(private htttpClient : HttpClient) { }

  addService(formData: FormData): Observable<any> {
    return this.htttpClient.post(this.urlApi, formData)
      .pipe(catchError(this.handleError));
  }

  getServices(){
    return this.htttpClient.get(this.urlApi);
  }

  getService(id: any): Observable<Service> {
    let API_URL = `${this.urlApi}/${id}`;
    return this.htttpClient.get<{ service: Service }>(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: { service: Service }) => res.service),
      catchError(this.handleError)
    );
  }

  updateService(id: any, formData: FormData): Observable<any> {
    const API_URL = `${this.urlApi}/${id}`;
    return this.htttpClient.post(API_URL, formData, {
      headers: new HttpHeaders({ 'Accept': 'application/json' }),
      reportProgress: true,
      observe: 'events'
    }).pipe(catchError(this.handleError));
  }

  

  deleteService(id : any): Observable<any>{
    let API_URL = `${this.urlApi}/${id}`;
    return this.htttpClient.delete(API_URL,{headers:this.httpHeaders}).pipe(catchError(this.handleError));
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
