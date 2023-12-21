// img-test.component.ts
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { ToastrService } from 'ngx-toastr';
import { image } from '../../models/image';
import { jsDocComment } from '@angular/compiler';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-img-test',
  templateUrl: './img-test.component.html',
  styleUrls: ['./img-test.component.css']
})
export class ImgTestComponent {

  private archivoSeleccionado: File | null = null;
  images: image[] = [];
  TolistImage? :image;
  formSigUp!: FormGroup;
  selectedFile?: string;


  constructor(private services: ServiceService, private toast: ToastrService, private fb: FormBuilder) { }






  onImageSelected(event: any) {
          const file = event.target.files[0];
          const reader = new FileReader();
          reader.onloadend = () => {
          const base64data = reader.result as string;
          this.selectedFile = base64data;

          };
          reader.readAsDataURL(file);
      }



  ngOnInit() {
    console.log(this.selectedFile)
    this.formSigUp = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      rutaImg: ['', Validators.required]
    })
  }

  subirdata2() {
    if (this.formSigUp.valid) {
      console.log(this.formSigUp.value)
      this.services.sigUp(this.formSigUp.value).subscribe({
        
        next: (res) => {
          this.toast.success('Usuario registrado');
        },
        error: (err) => {

          this.toast.error('No se pudo registrar. Error al subir la imagen.');
        }
      });
    }
  }



  getImageUrl(rutaimg: string | undefined): string {

    const imageUrl = `/assets/image/${rutaimg}`;
    console.log('Image URL:', imageUrl);
    return imageUrl;

  }







}
