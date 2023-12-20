// img-test.component.ts
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { ToastrService } from 'ngx-toastr';
import { image } from '../../models/image';
import { jsDocComment } from '@angular/compiler';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-img-test',
  templateUrl: './img-test.component.html',
  styleUrls: ['./img-test.component.css']
})
export class ImgTestComponent  {

  private archivoSeleccionado: File | null = null;
  images: image[] = [];
  formSigUp!: FormGroup;
  selectedFile: File | null = null;

  constructor(private services: ServiceService, private toast: ToastrService, private fb : FormBuilder) {}

   ngOnInit(){
    this.formSigUp = this.fb.group({
      username : ['',Validators.required],
      email : ['',Validators.required],
      password : ['',Validators.required],
      rutaImg: ['', Validators.required]
    })
   }

   
 


   onFileSelected(event: any) {
    const fileInput = event.target;
  
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

subirdata2() {
  if (this.formSigUp.valid && this.selectedFile) {
    const formData = new FormData();
    formData.append('username', this.formSigUp.get('username')?.value);
    formData.append('email', this.formSigUp.get('email')?.value);
    formData.append('password', this.formSigUp.get('password')?.value);
    formData.append('rutaImg', this.selectedFile);

    this.services.sigUp(formData).subscribe({
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
