import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  // Vars Mostrar/ocultar contraseñá
  verContrasena = true; 
  verConfirmContrasena = true;

  // Var Formulario registro
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required, // Campo obligatorio
        Validators.minLength(8), // Minimo 8 caracteres
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/) // Al menos letras minuscula, mayuscula, un numero y un simbolo
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.comprobarContrasenas });
}

comprobarContrasenas(form: FormGroup) {
  const contrasena = form.get('password')?.value;
  const confirmContrasena = form.get('confirmPassword')?.value;
  return contrasena === confirmContrasena ? null : { mismatch: true };
}

    // Método para manejar la sumisión del formulario
    onSubmit() {
      if (this.registerForm.valid) {
        // Aquí puedes manejar el registro o la lógica adicional
        console.log('Formulario válido', this.registerForm.value);
      } else {
        console.log('Formulario inválido');
      }
    }
  }