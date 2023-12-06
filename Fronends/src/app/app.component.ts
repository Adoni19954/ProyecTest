import { Component } from '@angular/core';
import { ServiceService } from './services/service.service';
import { model } from './models/model';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fronendds';
    
  constructor(private route : Router){}


 
}
