import { Component, Input } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { model } from '../../models/model';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesAuthsService } from '../../services/services-auths.service';
import { jwtDecode } from 'jwt-decode';



@Component({
  selector: 'app-accion-detail',
  templateUrl: './accion-detail.component.html',
  styleUrl: './accion-detail.component.css'
})
export class AccionDetailComponent {

  models : model[]=[];
  ToListAccion? : model;
  user : any | undefined
  roles: any | undefined
  constructor(private services : ServiceService, private router : Router, private auths : ServicesAuthsService){}

  ngOnInit(){
    this.services.get().subscribe((result : model[]) => (this.models = result))
     this.auths.tokenDecode();
     this.GetTokenRole();
      this.MostrarRoleToken();
      
  }


    
  UpdateAction(models : model[]){
    this.models = models
  }

  NewInitAction(){
    this.ToListAccion = new model()
  }

  EditAction(models : model){
    this.ToListAccion = models
  }

  GetTokenRole () {
      const token = localStorage.getItem('Token');
      
      if(token){
        const decode: any = jwtDecode(token)
        if(decode && decode.role)
        {
          const rol : string = decode.role      
          return rol
          
        }

      }
      return null
     }

     MostrarRoleToken(){
      const rolFromToken = this.GetTokenRole();
      this.roles = rolFromToken
     }

  

}
