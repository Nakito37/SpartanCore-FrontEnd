import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.css'
})
export class VerificationComponent {

  tokenForm: FormGroup;
  spinnerCargando = false;
  userToken: String | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<VerificationComponent>,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.tokenForm = this.fb.group({
      codigoVerificacion: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  onSubmit() {
    if (this.tokenForm.valid) {
      this.spinnerCargando = true;
      const codigoVerificacion = { codigo_verificacion: this.tokenForm.value.codigoVerificacion };

      // Llamar al servicio para verificar el código 2FA
      this.authService.verificar2FA(codigoVerificacion).subscribe({
        next: (response) => {
          console.log("2fa res: ", response);
          this.authService.guardarToken(response.token, response.expiresIn)
          this.snackBar.open('Autenticación exitosa', 'Cerrar', { duration: 6000 });
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.spinnerCargando = false;
          this.snackBar.open('Código de verificación incorrecto.', 'Cerrar', { duration: 6000 });
        }
      });
    } else {
      this.snackBar.open('Por favor, ingresa un código de 6 dígitos.', 'Cerrar', { duration: 6000 });
    }
  }

  cerrarDialogo() {
    this.dialogRef.close(false); 
  }

}
