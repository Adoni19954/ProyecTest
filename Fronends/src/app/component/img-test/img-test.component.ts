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
export class ImgTestComponent {

  private archivoSeleccionado: File | null = null;
  images: image[] = [];
  formSigUp!: FormGroup;
  selectedFile?: string;


  constructor(private services: ServiceService, private toast: ToastrService, private fb: FormBuilder) { }







 /* onFileSelected(event: any) {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      this .formSigUp. patchValue
        ({
          rutaImg : this.selectedFile
        });

      this.formSigUp.get('rutaImg')?.markAsDirty();
      this.formSigUp.get('rutaImg')?.updateValueAndValidity();
    }
  }*/




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
      rutaImg: [this.selectedFile, Validators.required]
    })
  }

  subirdata2() {
    if (this.formSigUp.valid) {
      const formData = new FormData();
      formData.append('username', this.formSigUp.get('username')?.value);
      formData.append('email', this.formSigUp.get('email')?.value);
      formData.append('password', this.formSigUp.get('password')?.value);
      formData.append('rutaImg',this.formSigUp.get('rutaImg')?.value  )

      formData.forEach((value, key) => {
        console.log(key, value);
      });


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
