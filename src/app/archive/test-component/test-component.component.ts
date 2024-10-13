import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { RatingModule } from 'primeng/rating';
import { DropdownModule } from 'primeng/dropdown';

interface Catego{
  name: string;
}


@Component({
  selector: 'app-test-component',
  standalone: true,
  imports: [
    MatButtonModule, MatDividerModule, MatIconModule,
    DialogModule, ButtonModule, FileUploadModule, PanelModule, InputTextareaModule, DropdownModule, RatingModule, ToastModule, ScrollPanelModule
  ],
  templateUrl: './test-component.component.html',
  styleUrl: './test-component.component.css'
})
export class TestComponentComponent {


  categorias: Catego[] | undefined;
  selectedCategoria: Catego | undefined;

  value!: number;
  publicaciones: any[] = [];
  displayModal: boolean = false;
  nuevaPublicacion: any = {
    texto: '',
    imagen: ''
  };

  openModal() {
    this.displayModal = true; 
  }

  closeModal() {
    this.displayModal = false; 
    this.nuevaPublicacion = { texto: '', imagen: '' }; 
  }

  subirContenido() {
    if (this.nuevaPublicacion.texto || this.nuevaPublicacion.imagen) {
      this.publicaciones.unshift({
        usuario: 'Nuevo Usuario', 
        contenido: this.nuevaPublicacion.texto,
        img: this.nuevaPublicacion.imagen
      });
      this.closeModal();
    }
  }


  onFileSelect(event: any) {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.nuevaPublicacion.imagen = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
