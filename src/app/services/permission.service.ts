import { Injectable } from '@angular/core';
import { Permission } from '../Permission';
import { catchError,map } from 'rxjs';
import { Observable,throwError } from 'rxjs';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  
  urlApi: string = 'http://lmallemv2.test/lmallem-backend/public/api/permissions';
  httpHeaders = new HttpHeaders().set('Content-Type','application/json');

  constructor(private htttpClient : HttpClient) { }

  addPermission(data:Permission) : Observable<any>{
    let API_URL = `${this.urlApi}`;
    return this.htttpClient.post(API_URL,data).pipe(catchError(this.handleError));
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
