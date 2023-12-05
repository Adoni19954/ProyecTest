import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesAuthsService } from '../../services/services-auths.service';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-pag-menu',
  templateUrl: './pag-menu.component.html',
  styleUrl: './pag-menu.component.css'
})
export class PagMenuComponent {

  usernameToke : any | undefined;
  constructor(private router : Router){}
  
  cerrarSession(){
    localStorage.clear();
    this.router.navigate(['login']);
    
  }
     
  

  ngOnInit(){
      this.GetTokenUsername();
      
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

  
}
