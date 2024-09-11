import { Injectable } from '@angular/core';
import { catchError,map } from 'rxjs';
import { Observable,throwError } from 'rxjs';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Role } from '../Models/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  urlApi: string = 'http://lmallemv2.test/lmallem-backend/public/api/roles';
  httpHeaders = new HttpHeaders().set('Content-Type','application/json');

  constructor(private httpClient : HttpClient) { }

  addRole(data:Role) : Observable<any>{
    let API_URL = `${this.urlApi}`;
    return this.httpClient.post(API_URL,data).pipe(catchError(this.handleError));
  }

  getRoles(){
    return this.httpClient.get(this.urlApi);
  }

  getRole(id: any): Observable<Role> {
    let API_URL = `${this.urlApi}/${id}`;
    return this.httpClient.get<{ role: Role }>(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: { role: Role }) => res.role),
      catchError(this.handleError)
    );
  }

  updateRole(id : any,data:Role ): Observable<any>{
    let API_URL = `${this.urlApi}/${id}`;
    return this.httpClient.put(API_URL,data,{headers:this.httpHeaders}).pipe(catchError(this.handleError));
  }

  deleteRole(id : any): Observable<any>{
    let API_URL = `${this.urlApi}/${id}`;
    return this.httpClient.delete(API_URL,{headers:this.httpHeaders}).pipe(catchError(this.handleError));
  }

  addPermissionToRole(roleId: number, permissions: number[]): Observable<any> {
    const API_URL = `${this.urlApi}/${roleId}/give-permissions`;
    return this.httpClient.post(API_URL, { permissions }, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  getRolesWithPermissions(): Observable<any> {
    return this.httpClient.get(`${this.urlApi}/roles-with-permissions`);
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
