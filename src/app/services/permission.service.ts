import { Injectable } from '@angular/core';
import { Permission } from '../Models/Permission';
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

  getPermissions(){
    return this.htttpClient.get(this.urlApi);
  }

  getPermission(id: any): Observable<Permission> {
    let API_URL = `${this.urlApi}/${id}`;
    return this.htttpClient.get<{ permission: Permission }>(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: { permission: Permission }) => res.permission),
      catchError(this.handleError)
    );
  }

  updatePermission(id : any,data:Permission ): Observable<any>{
    let API_URL = `${this.urlApi}/${id}`;
    return this.htttpClient.put(API_URL,data,{headers:this.httpHeaders}).pipe(catchError(this.handleError));
  }

  deletePermission(id : any): Observable<any>{
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
