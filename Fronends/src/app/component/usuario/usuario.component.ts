import { Component } from '@angular/core';
import { authTests } from '../../models/authTest';
import { ServiceService } from '../../services/service.service';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { ServicesAuthsService } from '../../services/services-auths.service';



@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  User: authTests[] = [];
  ToListAuths?: authTests;
  Role : any | undefined;


  constructor(private services: ServiceService,
     private toastr: ToastrService, 
     private router : Router, 
     private location: Location,
     private auth : ServicesAuthsService
     ) { }

  ngOnInit() {
    this.services.GetUsuario().subscribe((result: authTests[]) => (this.User = result))


    this.Role = this.services.OpenToken();
      
   if(this.Role == 'user'){
    this.location.back();
    this.toastr.error('acesso denegado');
   }else{
      this.router.navigate(['/usuario'])
   }
  }

  deleteUser(auth: authTests | undefined) {
    if (auth && auth.id) {
      this.services.DeleteUser(auth).subscribe(
        (result: authTests[]) => {
          this.User = result;
          this.toastr.success('Usuario eliminado con éxito.');
        },
        (error) => {
          console.error('Error al eliminar usuario:', error);
        }
      );
    }
  }
update_user : boolean = false;
  updateUser(auth : authTests[]){
    this.User = auth
  }

  ediUser(auth : authTests){
    this.ToListAuths =  { ...auth }
    console.log(auth);
  }

  updateUserForm() {
    if (this.ToListAuths) {
      this.services.UpdateUserRole(this.ToListAuths).subscribe(
        (result: authTests[]) => {
          this.User = result;
          this.toastr.success('Usuario actualizado con éxito.');
        },
        (error) => {
          this.toastr.error('Usuario no actualizado', error);
        }
      );
    }
  }


}





