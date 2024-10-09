import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  items: any[] = [];
  usuario: string = 'Usuario';
  isHome: boolean = false;
  isPublication: boolean = false;

  constructor(private router: Router) {
    // Escuchar cambios en la navegación para actualizar el estado de 'Inicio'
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHome = this.router.url === '/home';
        this.isPublication = this.router.url === '/publications';
        this.updateMenuItems();
      }
    });
  }

  ngOnInit() {
    // Inicializar el estado del botón 'Inicio' cuando el componente se carga
    this.updateMenuItems();
  }

  updateMenuItems() {
    this.items = [
      {
        label: 'Ver Perfil',
        icon: 'pi pi-user',
        command: () => {
          this.verPerfil();
        }
      },
      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-sign-out',
        command: () => {
          this.cerrarSesion();
        }
      },
      {
        separator: true
      },
      {
        label: this.usuario,
        disabled: true
      }
    ];
  }

  verPerfil() {
    // Implementar lógica para redirigir al perfil
    console.log('Ver Perfil');
    this.router.navigate(['/profile']);
  }

  cerrarSesion() {
    // Implementar lógica para cerrar sesión
    console.log('Cerrar Sesión');
  }
}
