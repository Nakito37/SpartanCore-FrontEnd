import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css'
})
export class VerifyEmailComponent {
  mensaje: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el token de la URL
    const token = this.route.snapshot.paramMap.get('token');
    if (token) {
      // Verificar el token de correo
      this.authService.verificarCorreo(token).subscribe({
        next: (response) => {
          this.mensaje = 'Cuenta verificada correctamente. Redirigiendo al login...';
          // Redirigir al login después de unos segundos
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error: (error) => {
          console.error('Error al verificar la cuenta', error);
          this.mensaje = 'El enlace de verificación es inválido o ha expirado.';
        }
      });
    } else {
      this.mensaje = 'Token no válido.';
    }
  }
}
