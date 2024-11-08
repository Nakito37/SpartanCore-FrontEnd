import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


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

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHome = this.router.url === '/home';
        this.isPublication = this.router.url === '/publications';
        this.updateMenuItems();
      }
    });
  }

  ngOnInit() {
    this.updateMenuItems();
    this.updateUsuario();
  }

  updateUsuario() {
    if (this.authService.isAuthenticated()) {
      const nombreUsuario = this.authService.obtenerUsuario();      
      if (nombreUsuario) {
        this.usuario = nombreUsuario;
      }
      this.usuario;
    }
  }
 
  updateMenuItems() {
    this.items = [
      {
        label: 'Mi Perfil',
        icon: 'pi pi-user-edit',
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
        icon: 'pi pi-user',
        label: this.usuario,
        disabled: true
      }
    ];
  }

  verPerfil() {
    this.router.navigate(['/profile']);
  }

  cerrarSesion() {
    this.authService.logout();
  }
}
