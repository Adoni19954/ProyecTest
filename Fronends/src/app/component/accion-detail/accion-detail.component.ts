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

}
