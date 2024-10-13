import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-session-alert',
  templateUrl: './session-alert.component.html',
  styleUrl: './session-alert.component.css'
})
export class SessionAlertComponent {

  display: boolean = false;

  constructor(private authService: AuthService, private dialogRef: MatDialogRef<SessionAlertComponent>) { }

  mostrarAlerta(){
    this.dialogRef;
  }
  // Método para cerrar el modal
  cerrarDialogo() {
    this.dialogRef.close(false); 
  }

}