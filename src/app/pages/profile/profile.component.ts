import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

import { RatingModule } from 'primeng/rating';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider'; 
import { AuthService } from '../../services/auth.service';
import { PublicationsService } from '../../services/publications.service';
import { environment } from '../../../environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RatingModule,

    MatButtonModule,
    MatIcon,
    MatDividerModule,

  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  apiUrl: string = environment.apiUrl; 
  usuario: any;
  optionInfo: string = '';
  publicaciones: any[] = [];

  constructor(private authService: AuthService, private publicationsService: PublicationsService) {
  }

  ngOnInit() {
    this.usuario = this.obtenerUsuario();    
    if (this.usuario) { 
      this.cargarPublicaciones();
    } else {
      console.error("Error: no se pudo obtener el ID del usuario.");
    }
    
  }

  obtenerUsuario(): number{
    return this.authService.obtenerIdUsuario();
  }

  seleccionarOpcion(opcion: string) {
    this.optionInfo = opcion;
  }

  cargarPublicaciones() {
    this.publicationsService.obtenerUserPublicaciones().subscribe(
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
  }

}
