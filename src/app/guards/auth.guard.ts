import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); 
  const router = inject(Router);
  const snackBar = inject(MatSnackBar); 

  // Verificar si el usuario está autenticado
  if (authService.isAuthenticated()) {
    return true;
  } else {
    snackBar.open('Inicia sesión para continuar', 'Cerrar', {
      duration: 3000,  // Duración del mensaje en milisegundos
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false; 
  }

};
