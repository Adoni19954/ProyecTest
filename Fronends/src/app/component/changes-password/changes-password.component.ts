
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../services/service.service';
import { authTests } from '../../models/authTest';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-changes-password',
  templateUrl: './changes-password.component.html',
  styleUrl: './changes-password.component.css'
})
export class ChangesPasswordComponent {
    auth : authTests[]=[];
    formSigUp!: FormGroup;
    id? :any | undefined


 

    constructor(private services : ServiceService, 
     private toast: ToastrService,
     private fb: FormBuilder){}

 
     ngOnInit(){
      this.mostrarToken();
       this.formSigUp = this.fb.group({
        id : [this.id, Validators.required],
        password : ['', Validators.required],
        passwordConfin : ['', Validators.required]
       })
    }

     tokenId() {
      const token = localStorage.getItem('Token');
      if(token){
        const decode : any = jwtDecode(token)
        if(decode && decode.gender){
          const ids : string = decode.gender
          return ids
        }
      }
      return null
     }

     mostrarToken(){
      const tokenIdAlmacenar = this.tokenId();
      return this.id = tokenIdAlmacenar
     }



   chanesthePasswword(){
    if(this.formSigUp.valid){
      this.services.changesPassword(this.formSigUp.value).subscribe({
        next:(res)=>{
          this.toast.success(res.message);
        },
        error: (err) =>{
          this.toast.error(err?.error.message);
        }})
    }
   }

    
}
