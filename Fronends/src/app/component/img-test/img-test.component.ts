// img-test.component.ts
import { Component } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { ToastrService } from 'ngx-toastr';
import { image } from '../../models/image';

@Component({
  selector: 'app-img-test',
  templateUrl: './img-test.component.html',
  styleUrls: ['./img-test.component.css']
})
export class ImgTestComponent {

  private archivoSeleccionado : File | null = null;
  public modelo: image | undefined;

  constructor(private services : ServiceService, private toast : ToastrService){}

  onFileSelected(event: any): void {
    this.archivoSeleccionado = event.target.files?.[0] || null;
  }

  subirImagen(): void {
    if (this.archivoSeleccionado) {
      this.services.subirImagen(this.archivoSeleccionado)
        .subscribe(
          resultado => {
            console.log('Imagen subida exitosamente', resultado);
            this.modelo = resultado;
            this.toast.success('Imagen subida exitosamente');
          },
          error => {
            console.error('Error al subir la imagen', error);
            this.toast.error('Error al subir la imagen');
          }
        );
    }
  }

  obtenerUrlImagen(): string {
   
    if (this.modelo && this.modelo.id !== undefined) {
      return this.services.obtenerUrlImagen(this.modelo.id);
    }
    return ''; 
  }

  
}
