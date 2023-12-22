import { Component, Input } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { model } from '../../models/model';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesAuthsService } from '../../services/services-auths.service';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';


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
  buscar : string ='';
  constructor(private services : ServiceService, 
    private router : Router,
     private auths : ServicesAuthsService, 
     private toastr: ToastrService){}

  ngOnInit(){
    this.services.get().subscribe((result : model[]) => (this.models = result))
     this.auths.tokenDecode();
      this.roles = this.services.OpenToken();   
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

  buscarGet() : void{
     this.services.getLookFor(this.buscar).subscribe((data) =>{
     this.models = data;

     },
     (error) =>{
     this.toastr.error("accio  no encontrada");
     if(this.buscar == ''){
      this.services.get().subscribe((result : model[]) => (this.models = result))
     }

     })

  }

}
