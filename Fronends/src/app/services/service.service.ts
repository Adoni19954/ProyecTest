import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { model } from '../models/model';
import {JwtHelperService} from '@auth0/angular-jwt';
import { jwtDecode } from 'jwt-decode';
import { authTests } from '../models/authTest';


@Injectable({
  providedIn: 'root', 
  
})
export class ServiceService {
 
  Url = "Accion";
  Urluths = "AuthTest";

  constructor(private http : HttpClient, private jwtHelper : JwtHelperService) { }


  public get() : Observable<model[]>{
    return this.http.get<model[]>(`${environment.ApiUrl}/${this.Url}`)
  }

  public post(models : model) : Observable<model[]>{
    return this.http.post<model[]>(`${environment.ApiUrl}/${this.Url}`,models)
  }

  public put(models : model) : Observable<model[]>{
    return this.http.put<model[]>(`${environment.ApiUrl}/${this.Url}`,models)
  }

  public delete(models : model) : Observable<model[]>{
    return this.http.delete<model[]>(`${environment.ApiUrl}/${this.Url}/${models.id}`)
  }

 /* ----------------------------------------------------------------------------------*/

sigUp(UserObj : any){
    
  return this.http.post<any>(`${environment.ApiUrl}/AuthTest/register`, UserObj)
  }

  login(UserObj : any){
   
    return this.http.post<any>(`${environment.ApiUrl}/AuthTest/authenticator`, UserObj)
  }


  GetUsuario() : Observable<authTests[]>{
    return this.http.get<authTests[]>(`${environment.ApiUrl}/${this.Urluths}`);
  }

  DeleteUser(auth : authTests): Observable<authTests[]>{
    return this.http.delete<authTests[]>(`${environment.ApiUrl}/${this.Urluths}/${auth.id}`);
  }

  UpdateUserRole(auth : authTests) : Observable<authTests[]>{
    return this.http.put<authTests[]>(`${environment.ApiUrl}/${this.Urluths}`,auth);
  }


  public  isAuthenticated () : boolean{
    const token = localStorage.getItem('Token')
    return !this.jwtHelper.isTokenExpired(token)
  }

  public getDecodedToken() {
    const token = localStorage.getItem('Token');
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }


  
  

  
  // ...
  
  // Ejemplo de cómo utilizarlo


   



}