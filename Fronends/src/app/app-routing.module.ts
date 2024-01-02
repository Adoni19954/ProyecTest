import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { AccionComponent } from './component/accion/accion.component';
import { AccionDetailComponent } from './component/accion-detail/accion-detail.component';
import { RegistroComponent } from './component/registro/registro.component';
import { PagErrorComponent } from './component/pag-error/pag-error.component';
import { ServicesAuthsService as AuthGuard  } from './services/services-auths.service';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { ImgTestComponent } from './component/img-test/img-test.component';
import { TestResposiveComponent } from './component/test-resposive/test-resposive.component';
import { ChangesPasswordComponent } from './component/changes-password/changes-password.component';


const routes: Routes = [
  {
    path : "login",
    component : LoginComponent
  },
  {
    path : 'acerca',
    component : AccionDetailComponent
  },
  {
    path : "accion",
    component : AccionDetailComponent,
    canActivate: [AuthGuard] 
  },
  {
    path : "register",
    component : RegistroComponent
  },
  {
    path : "usuario",
    component : UsuarioComponent
  },
  {
    path : "img",
    component : ImgTestComponent
  },
  {
    path : "test",
    component : TestResposiveComponent
  },
  {
   path: "changespassword",
   component : ChangesPasswordComponent
  },
  {
    path : "**",
    component: PagErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
