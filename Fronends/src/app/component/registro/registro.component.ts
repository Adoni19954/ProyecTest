import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { authTests } from '../../models/authTest';
import { Router } from '@angular/router';
import{ ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  formSigUp!: FormGroup;

  constructor(
    private service : ServiceService,
    private fb : FormBuilder,
    private router : Router,
    private toastr: ToastrService
    ){}

    ngOnInit(){
      this.formSigUp = this.fb.group({
        username : ['', Validators.required],
        password : ['', Validators.required],
        email : ['', Validators.required]
      })
    }

    sigUp(){
      if(this.formSigUp.valid){
        this.service.sigUp(this.formSigUp.value).subscribe({
          next : (res) =>{
              this.formSigUp.reset();
              this.router.navigate(['login'])
              this.toastr.success(res.message)
          },
          error : (err) => {
             alert(err?.error.message)
             this.toastr.success(err.message)
          }
        })
      }
    }

}
