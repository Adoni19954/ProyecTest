import { Injectable, NgModule } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ServiceService } from './service.service';
import { CanActivate, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
  
})
export class ServicesAuthsService implements CanActivate{

  constructor(private services : ServiceService, private router : Router,private toastr: ToastrService ) { }

   public canActivate() : boolean{
    if(!this.services.isAuthenticated()){
      this.router.navigate(['login'])
      this.toastr.error('Error acceso denegado');
      return false
    }
    return true
   }


   public tokenDecode(){
    const decodedToken = this.services.getDecodedToken();
    return decodedToken;

   }



 


}
