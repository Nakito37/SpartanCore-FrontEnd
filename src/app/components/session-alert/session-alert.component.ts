import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-session-alert',
  templateUrl: './session-alert.component.html',
  styleUrl: './session-alert.component.css'
})
export class SessionAlertComponent {

  display: boolean = true; // Controla la visibilidad del modal

  @Output() onExtendSession = new EventEmitter<boolean>();

  constructor(private authService: AuthService) { }

  // Método para cerrar el modal
  cerrarDialogo() {
    this.display = false;
  }

}