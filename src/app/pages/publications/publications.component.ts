import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
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
import { DividerModule } from 'primeng/divider';

import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider'; 
import { MessageService } from 'primeng/api';

import { AuthService } from '../../services/auth.service';
import { PublicationsService } from '../../services/publications.service';
import { environment } from '../../../environment';
import { HttpErrorResponse } from '@angular/common/http';


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
    DividerModule,

    MatButtonModule,
    MatDividerModule,
    MatIcon,

  ],
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService]
})
export class PublicationsComponent implements OnInit {
  apiUrl: string = environment.apiUrl; 
  contenido: string = '';
  archivo: File | null = null;
  categorias: any[] | undefined;
  selectedCategoria: any;

  publicaciones: any[] = [];

  value!: number;
  displayModal: boolean = false;
  errorMessage: string | undefined;
 

  constructor(private publicationsService: PublicationsService, private messageService: MessageService, private authService: AuthService) { }

  ngOnInit() {
    this.categorias = [
      { catego: 'Gimnasio' },
      { catego: 'Calistenia' },
      { catego: 'Crossfit' },
      { catego: 'Salud' }
    ];
    this.cargarPublicaciones();
  }

  onFileSelect(event: any) {
    this.archivo = event.files[0];
  }

  subirContenido(): void {    
      const formData: FormData = new FormData();

      formData.append('contenido_publicacion', this.contenido);
      formData.append('categoria', this.selectedCategoria.catego);
      if (this.archivo) {
        formData.append('media', this.archivo);
      } 

      this.publicationsService.crearPublicacion(formData).subscribe(
        (response) => {
          console.log("newPub: ", response);
          
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Publicación creada' });
          this.cargarPublicaciones();
          this.closeModal();
          this.resetForm();
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear publicación' });
        }
      );
  }

  // Método para cargar las publicaciones desde el backend
  cargarPublicaciones(): void {

    this.publicationsService.obtenerPublicaciones().subscribe(
      (response: any[]) => {
        this.publicaciones = response.map(post => {
          const media = post.DatosPublicacions[0]; // Asumimos que cada post tiene al menos un archivo multimedia
          return {
            id_publicacion: post.id_publicacion,
            nombre_usuario: post.Usuario ? post.Usuario.nombre_usuario : null,
            contenido_publicacion: post.contenido_publicacion,
            tipo: media ? media.media : null, // 'image' o 'video'
            media_url: media ? `${this.apiUrl}${media.media_url}` : null, // Concatenar la URL del contenido multimedia
            rating: 0 // Valor predeterminado para el rating
          };
        });
      },
      (error: HttpErrorResponse) => {
        console.error('Error al obtener las publicaciones', error);
      }
    );

/*     
    this.publicationsService.obtenerPublicaciones().subscribe(
      (data) => {
        console.log("data: ", data); 

        this.publicaciones = data.map((post: any) => ({
          nombre_usuario: post.Usuario ? post.Usuario.nombre_usuario: "No disponible",
          contenido_publicacion: post.contenido_publicacion,
          media_url: post.DatosPublicacions?.[0]?.media_url || null, 
          tipo: post.DatosPublicacions?.[0]?.media || null,
          rating: 0
        }));
        console.log("final pubs: ", this.publicaciones);
        
      },
      (error) => {
        console.error('Error al cargar publicaciones:', error);
      }
    );
 */
  }

  resetForm() {
    this.contenido = '';
    this.selectedCategoria = null;
    this.archivo = null;
  }

  openModal() {
    this.displayModal = true; 
  }

  closeModal() {
    this.resetForm();
    this.displayModal = false; 
  }

}