import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { model } from '../../models/model';

@Component({
  selector: 'app-accion',
  templateUrl: './accion.component.html',
  styleUrl: './accion.component.css'
})
export class AccionComponent {

  @Input() models? : model;
  @Output() update = new EventEmitter<model[]>();

  constructor(private services : ServiceService){}

  updateAction(models : model){
    this.services.put(models).subscribe((result : model[]) => this.update.emit(result))
  }

  createAction(models : model){
    this.services.post(models).subscribe((result : model[]) => this.update.emit(result))
  }

  deleteAction(models : model ){
    this.services.delete(models).subscribe((result : model[]) => this.update.emit(result))
  }

}
