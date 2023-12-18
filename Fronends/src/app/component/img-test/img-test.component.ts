// img-test.component.ts
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { ToastrService } from 'ngx-toastr';
import { image } from '../../models/image';

@Component({
  selector: 'app-img-test',
  templateUrl: './img-test.component.html',
  styleUrls: ['./img-test.component.css']
})
export class ImgTestComponent implements OnInit {

  private archivoSeleccionado: File | null = null;
  images: image[] = [];
 private acu ?: string ;
  constructor(private services: ServiceService, private toast: ToastrService) {}

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.services.getImages().subscribe(
      (data: image[]) => {
        this.images = data;
        console.log('Images from API:', data);
      },
      (error) => {
        console.error('Error fetching images:', error);
      }
    );
  }

  onFileSelected(event: any): void {
    this.archivoSeleccionado = event.target.files?.[0] || null;
    this.acu = event.target.file?.[0] || null;
    console.log( this.acu)
  }

  subirImagen(): void {
    if (this.archivoSeleccionado) {
      const formData = new FormData();
      formData.append('imagen', this.archivoSeleccionado);
  
      this.services.SaveImageUser(formData).subscribe(
        (resultado) => {
          this.toast.success('Imagen subida exitosamente');
          this.loadImages();
        },
        (error) => {
          this.toast.error('Error al subir la imagen');
        }
      );
    }
  }
  

  getImageUrl(rutaimg: string | undefined): string {

    const imageUrl = `/assets/image/${rutaimg}`;
    console.log('Image URL:', imageUrl);
    return imageUrl;
  
  }
  
  
  
  
  
  
  
}
