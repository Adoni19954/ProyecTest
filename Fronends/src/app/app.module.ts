import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccionComponent } from './component/accion/accion.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './component/login/login.component';
import { AccionDetailComponent } from './component/accion-detail/accion-detail.component';
import { ToastrModule } from 'ngx-toastr';
import { ɵBrowserAnimationBuilder } from '@angular/animations';
import { RegistroComponent } from './component/registro/registro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagMenuComponent } from './component/pag-menu/pag-menu.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { ServiceService } from './services/service.service';
import { InjectionToken } from '@angular/core';
import { ServicesAuthsService } from './services/services-auths.service';
import { PagErrorComponent } from './component/pag-error/pag-error.component';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ImgTestComponent } from './component/img-test/img-test.component';
import { TestResposiveComponent } from './component/test-resposive/test-resposive.component';




@NgModule({
  declarations: [
    AppComponent,
    AccionComponent,
    LoginComponent,
    AccionDetailComponent,
    RegistroComponent,
    PagErrorComponent,
    PagMenuComponent,
    UsuarioComponent,
    ImgTestComponent,
    TestResposiveComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatSlideToggleModule
  
    
    
    
  ],
  providers: [JwtHelperService, ServiceService, { provide: JWT_OPTIONS, useValue: {} },],
  bootstrap: [AppComponent]
})
export class AppModule { }
