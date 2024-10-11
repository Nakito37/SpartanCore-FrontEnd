import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { RatingModule } from 'primeng/rating';
import { DropdownModule } from 'primeng/dropdown';

import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider'; 


interface Catego{
  name: string;
}

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    DialogModule,
    PanelModule,
    ScrollPanelModule,
    InputTextareaModule,
    ButtonModule,
    FileUploadModule,
    ToastModule,
    RatingModule,
    DropdownModule,

    MatButtonModule,
    MatDividerModule,
    MatIcon,

  ],
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PublicationsComponent {

  categorias: Catego[] | undefined;
  selectedCategoria: Catego | undefined;

  value!: number;
  publicaciones: any[] = [];
  displayModal: boolean = false;
  nuevaPublicacion: any = {
    texto: '',
    imagen: ''
  };

  constructor() { }


  ngOnInit(): void {

    this.categorias = [
      { name: "Calistenia"},
      { name: "Gimnasio"}
    ];
    // Publicaciones iniciales de ejemplo
    this.publicaciones = [
      { usuario: 'Usuario 1', contenido: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum..', img: 'https://via.placeholder.com/300x200' },
      { usuario: 'Usuario 2', contenido: 'Otra publicación de ejemplo.', img: 'https://via.placeholder.com/300x200' },
      { usuario: 'Usuario 3', contenido: 'publicación de ejemplo.', img: 'https://via.placeholder.com/300x200' },
      { usuario: 'Usuario 4', contenido: 'ejemplo.', img: 'https://via.placeholder.com/300x200' },
    ];
  }

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
