import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  verContrasena = true;
  spinnerCargando = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      nombreUsuario: ['', [Validators.required]],
      contrasena: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.spinnerCargando = true;  // Activar el spinner de carga

      const credenciales = {
        nombre_usuario: this.loginForm.value.nombreUsuario,
        contrasena_usuario: this.loginForm.value.contrasena
      };

      // Llamar al servicio de autenticación para hacer login
      this.authService.loginUsuario(credenciales).subscribe({
        next: (response) => {
          console.log('Usuario registrado correctamente', response);
          this.spinnerCargando = false;  // Desactivar el spinner de carga
          this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', { duration: 6000 });
          // Redirigir a la página principal o dashboard
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.spinnerCargando = false;  // Desactivar el spinner de carga
          console.error('Error al iniciar sesión', error);
          this.snackBar.open('Error al iniciar sesión. Por favor, verifica tus credenciales.', 'Cerrar', { duration: 6000 });
        }
      });
    } else {
      console.log('Formulario inválido');
      this.snackBar.open('Error interno del servidor. Intenta más tarde.', 'Cerrar', { duration: 6000 });
    }
  }
  
}
