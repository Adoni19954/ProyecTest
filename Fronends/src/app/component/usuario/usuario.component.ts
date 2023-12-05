import { Component } from '@angular/core';
import { authTests } from '../../models/authTest';
import { ServiceService } from '../../services/service.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  User: authTests[] = [];
  ToListAuths?: authTests;

  constructor(private services: ServiceService, private toastr: ToastrService) { }

  ngOnInit() {
    this.services.GetUsuario().subscribe((result: authTests[]) => (this.User = result))
    
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
  UpdateUser(auth: authTests | undefined) {

    if (auth) {
      this.services.UpdateUserRole(auth).subscribe((result: authTests[]) => {
        this.User = result;
        this.toastr.success("Role Actualizado Existosamente");
      },
        (error) => {
          this.toastr.error('Usuario no Actualizado', error)
        })
    }
  }
  
      
}





