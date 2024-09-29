import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router) {}

  // Método para determinar si la ruta actual coincide con la ruta del botón
  isCurrentRoute(route: string): boolean {
    return this.router.url === `/${route}`;
  }
}
