import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesAuthsService } from '../../services/services-auths.service';
import { jwtDecode } from 'jwt-decode';
import { authTests } from '../../models/authTest';
import { ServiceService } from '../../services/service.service';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-pag-menu',
  templateUrl: './pag-menu.component.html',
  styleUrl: './pag-menu.component.css'
})
export class PagMenuComponent {
  authmodels : authTests[]=[]
  usernameToke : any | undefined;
  roleToke : any | undefined;
  imgToken : any | undefined;
  formSigUp!: FormGroup;
  selectedFile? : string;
  id: any | undefined;

  constructor(private router : Router, 
    private services : ServiceService,
     private fb : FormBuilder,
     private toastr: ToastrService){}
  
  cerrarSession(){
    localStorage.clear();
    this.router.navigate(['login']);
    
  }

  
   
     
  ngOnInit(){
      this.GetTokenUsername();
      this.MostrarImg();
      this.BuscarIdToken();
      console.log(this.id)

      this.formSigUp = this.fb.group({
         Id : [this.id, Validators.required],
         username : ['', Validators.required],
         rutaImg : ['', Validators.required]
      })
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
    const base64data = reader.result as string;
    this.selectedFile = base64data;

    };
    reader.readAsDataURL(file);
}

  updateProfile(){
    if(this.formSigUp.valid){
    this.services.UpdateUserProfile(this.formSigUp.value).subscribe( next =>{
      this.toastr.success('Perfil actualizado correctamente');
    },
    error =>{
     this.toastr.error('No se pudo actualizar el perfil');
    })
  }
  }

  GetTokenUsername () {
    const token = localStorage.getItem('Token');
    
    if(token){
      const decode: any = jwtDecode(token)
      if(decode && decode.unique_name)
      {
        const username : string = decode.unique_name       
        return username
        
      }

    }
    return null
   }

   MostrarUserNameToken(){
    const usernameFromToken = this.GetTokenUsername();
    return this.usernameToke = usernameFromToken
   }

GetTokenImg(){
  const token = localStorage.getItem('Token');

  if(token){
    const decode : any = jwtDecode(token)
    if(decode && decode.upn){
      const image : string = decode.upn
      return image
    }
  }
  return null
}

MostrarImg(){
  const ImageTokenget = this.GetTokenImg();
 return this.imgToken = ImageTokenget?.replace("C:\\fakepath\\", "/assets/image/")

}


GetIdToken(){
  const token = localStorage.getItem('Token');

  if(token){
    const decode : any = jwtDecode(token);
    if(decode && decode.gender){
      const Ids : string = decode.gender
      return Ids
    }
  }
  return null;
}

BuscarIdToken(){
  const idToken = this.GetIdToken();
  return this.id = idToken
}



 

  
}
