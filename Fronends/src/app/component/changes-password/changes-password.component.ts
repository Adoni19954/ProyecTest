
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Toast } from 'ngx-toastr';
import { ServiceService } from '../../services/service.service';
import { authTests } from '../../models/authTest';


@Component({
  selector: 'app-changes-password',
  templateUrl: './changes-password.component.html',
  styleUrl: './changes-password.component.css'
})
export class ChangesPasswordComponent {
    auth : authTests[]=[];
    contraseña?: string
    id? : number;
    constructor(private services : ServiceService, 
      private toast : Toast,
       private fb: FormBuilder){}



   LookForPasswword(){
    if(this.contraseña != null && this.id != 0){
    this.services.BuscarPassword(this.contraseña, this.id).subscribe(next =>{
    
    })
    }
   }

    
}
