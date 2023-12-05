import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { authTests } from '../../models/authTest';
import { Router } from '@angular/router';
import{ ToastrService} from 'ngx-toastr'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm! : FormGroup;
  auths : authTests[]=[]
  constructor(private services : ServiceService, private fb : FormBuilder, private router : Router, private toastr: ToastrService ){}

  ngOnInit() : void{
    this.loginForm = this.fb.group({
      username : ['', Validators.required],
      password : ['', Validators.required]

    })
  }

  login() {
    if(this.loginForm.valid){ 
      this.services.login(this.loginForm.value).subscribe({
        next:(res)=>{
          this.router.navigate(['accion'])
          this.toastr.success(res.message);
          localStorage.setItem('Token',res.token)
        },
        error: (err) =>{
          this.toastr.error(err?.error.message);
        }
      })
    }
  }

  
}
