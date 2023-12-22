import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { model } from '../models/model';
import {JwtHelperService} from '@auth0/angular-jwt';
import { jwtDecode } from 'jwt-decode';
import { authTests } from '../models/authTest';
import { image } from '../models/image';


@Injectable({
  providedIn: 'root', 
  
})
export class ServiceService {
 
  Url = "Accion";
  Urluths = "AuthTest";
  role : any |undefined;

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

  public getLookFor(UserObj : any) : Observable<model[]>{
    return this.http.get<model[]>(`${environment.ApiUrl}/${this.Url}/sumass?name=${name}`)
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

  SaveImageUser(formData : FormData) : Observable<any>{
    return this.http.post<authTests>(`${environment.ApiUrl}/AuthTest/savesImage`,formData)

  }

  UpdateUserProfile(UserObj : any){
    return this.http.put<any>(`${environment.ApiUrl}/${this.Urluths}/perfil`,UserObj);
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

  public GetRoleToken(){
    const token = localStorage.getItem('Token');

    if(token){
      const decode: any = jwtDecode(token);
      if(decode && decode.role){
        const role : string = decode.role;
        return role
      }
    }
    return null
  }

  OpenToken(){
    const tokenUser = this.GetRoleToken();
    return this.role = tokenUser;

  }


  ValidatorUrlRole(){
    if( this.role == 'admin'){
        
    }
  }

  /*------------------------------------------------------------------------------*/




  getImages(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.ApiUrl}/image/`);
  }

}
