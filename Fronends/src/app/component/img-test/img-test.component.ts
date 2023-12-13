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
 
  images: any[] = [];

  constructor(private services : ServiceService, private toast : ToastrService){}

  ngOnInit(): void {
    this.loadImages();
    console.log('Images:', this.images);
    
  }

  loadImages(): void {
    this.services.getImages().subscribe(
      (data) => {
        this.images = data;
      },
      (error) => {
        console.error('Error fetching images:', error);
      }
    );
  }
  onFileSelected(event: any): void {
    this.archivoSeleccionado = event.target.files?.[0] || null;
  }
/*
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
*/
  getImageUrl(rutaimg: string): string {
    return `https://localhost:7162/api/uploads/${rutaimg}`;
  }
  

  
}
