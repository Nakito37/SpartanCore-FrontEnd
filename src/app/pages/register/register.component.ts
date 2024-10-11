import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; 
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  verContrasena = true; 
  verConfirmContrasena = true;
  spinnerCargando = false;

  // Var Formulario registro
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.registerForm = this.fb.group({
      usuario: ['', [
        Validators.required,
        Validators.minLength(4), // Minimo 4 caracteres
        Validators.pattern(/^[^\s\d][a-zA-Z0-9_]+$/) // No permite comenzar la cadena con un espacio o numero ni permitir caracteres especiales, a excepcion de _
      ]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [
        Validators.required, 
        //Validators.minLength(8), 
        //Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/) // Al menos letras minuscula, mayuscula, un numero y un simbolo
      ]],
      confirmContrasena: ['', Validators.required]
    }, { validators: this.comprobarContrasenas });
}

comprobarContrasenas(form: FormGroup) {
  const contrasena = form.get('contrasena')?.value;
  const confirmContrasena = form.get('confirmContrasena')?.value;
  return contrasena === confirmContrasena ? null : { mismatch: true };
}

    // Método para manejar formulario
    onSubmit() {
      if (this.registerForm.valid) {
        console.log("Datos: ", this.registerForm);
        
        this.spinnerCargando = true;

        const usuario = {
          nombre_usuario: this.registerForm.value.usuario,
          correo_usuario: this.registerForm.value.correo,
          contrasena_usuario: this.registerForm.value.contrasena
        };
  
        // Llamar al servicio para registrar el usuario
        this.authService.registrarUsuario(usuario).subscribe({
          next: (response) => {
            this.spinnerCargando = false;
            this.snackBar.open('Usuario registrado correctamente. Por favor verifica tu correo electrónico antes de iniciar sesión.', 'Cerrar', {
              duration: 6000,
            });
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error('Error al registrar el usuario', error);
            this.spinnerCargando = false;
            this.snackBar.open('Error al registrar ' + error, 'Cerrar', {
              duration: 6000,
            });
          }
        });
      } else {
        console.log('Formulario inválido');
        this.snackBar.open('Error interno del servidor. Intenta más tarde.', 'Cerrar', { duration: 6000 })
      }
    }
  }