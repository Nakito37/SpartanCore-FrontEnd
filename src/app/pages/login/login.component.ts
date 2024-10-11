import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { VerificationComponent } from '../../components/verification/verification.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  verContrasena = true;
  spinnerCargando = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.loginForm = this.fb.group({
      nombreUsuario: ['', [Validators.required]],
      contrasena: ['', Validators.required],
      // rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.spinnerCargando = true; 

      const credenciales = {
        nombre_usuario: this.loginForm.value.nombreUsuario,
        contrasena_usuario: this.loginForm.value.contrasena
      };

      // Llamar al servicio de autenticación para hacer login
      this.authService.loginUsuario(credenciales).subscribe({
        next: (response) => {
          this.spinnerCargando = false;
          this.modalVerification();
        },
        error: (error) => {
          this.spinnerCargando = false; 
          console.error('Error al iniciar sesión', error);
          this.snackBar.open('Error al iniciar sesión. Por favor, verifica tus credenciales.', 'Cerrar', { duration: 6000 });
        }
      });
    } else {
      console.log('Formulario inválido');
      this.snackBar.open('Error interno del servidor. Intenta más tarde.', 'Cerrar', { duration: 6000 });
    }
  }

  // Método para abrir el modal de verificación 2FA
  modalVerification() {
    const dialogRef = this.dialog.open(VerificationComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', { duration: 6000 });
        this.router.navigate(['/home']);

        this.authService.mostrarTiempoExpiracionEnConsola();
      } else {
        this.snackBar.open('Verificación 2FA cancelada o fallida.', 'Cerrar', { duration: 6000 });
      }
    });
  }
  
}
