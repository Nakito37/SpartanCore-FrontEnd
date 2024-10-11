import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { DialogService } from 'primeng/dynamicdialog';
import { SessionAlertComponent } from '../components/session-alert/session-alert.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';  
  private expirationTimeout: any;
  private warningTimeout: any;
  

  constructor(private http: HttpClient, private router: Router, private dialogService: DialogService) { }

  // Método para registrar un usuario
  registrarUsuario(usuario: { nombre_usuario: string, correo_usuario: string, contrasena_usuario: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuarios/registro`, usuario);
  }

  // Método para verificar el token de correo electrónico
  verificarCorreo(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuarios/verificar/${token}`);
  }

  // Método para iniciar sesión de usuario
  loginUsuario(credenciales: { nombre_usuario: string, contrasena_usuario: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuarios/login`, credenciales);
  }

  // Método para verificar el código 2FA
  verificar2FA(codigoVerificacion: { codigo_verificacion: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuarios/verificar-2fa`, codigoVerificacion);
  }

  // Guardar el token JWT en el localStorage
  guardarToken(token: string, expiresIn: number) {
    const expirationTime = new Date().getTime() + expiresIn; // Tiempo actual + tiempo de expiración en milisegundos
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiration', expirationTime.toString())

    this.programarExpiracion(expiresIn);
    this.programarAdvertencia(expirationTime);
  }

  // Obtener el token del localStorage
  obtenerToken() {
    return localStorage.getItem('token');
  }

  // Verificar si el token ha expirado
  isAuthenticated(): boolean {
    const token = this.obtenerToken();
    const expiration = localStorage.getItem('tokenExpiration');
    if (!token || !expiration) {
      return false;
    }

    const now = new Date().getTime();
    const expirationTime = parseInt(expiration);

    // Si el tiempo actual es mayor que el tiempo de expiración, el token ha expirado
    if (now > expirationTime) {
      this.logout();
      return false;
    }

    return true;
  }


   // Programar el cierre de sesión cuando el token expire
   programarExpiracion(expiresIn: number) {
    if (this.expirationTimeout) {
      clearTimeout(this.expirationTimeout); 
    }

    this.expirationTimeout = setTimeout(() => {
      this.logout();
      console.log("Sesion expirada");
      

    }, expiresIn);
  }


// Obtener el tiempo restante antes de la expiración del token
obtenerTiempoExpiracion(): string | null {
  const expiration = localStorage.getItem('tokenExpiration');
  if (!expiration) {
    return null;
  }

  const now = new Date().getTime();
  const expirationTime = parseInt(expiration);

  const tiempoRestante = expirationTime - now;

  if (tiempoRestante <= 0) {
    return 'El token ha expirado';
  }

  // Convertir el tiempo restante de milisegundos a minutos y segundos
  const minutos = Math.floor(tiempoRestante / (1000 * 60));
  const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

  return `${minutos} minutos y ${segundos} segundos restantes`;
}

// Mostrar el tiempo restante en la consola
mostrarTiempoExpiracionEnConsola() {
  const tiempoRestante = this.obtenerTiempoExpiracion();
  if (tiempoRestante) {
    console.log(`Tiempo de expiración del token: ${tiempoRestante}`);
  } else {
    console.log('No hay token disponible o ya ha expirado.');
  }
}



 // Programar advertencia 20 segundos antes de que el token expire
 programarAdvertencia(expirationTime: number) {
  const tiempoRestante = expirationTime - new Date().getTime();
  const tiempoAdvertencia = tiempoRestante - 50000;  // Advertencia 20 segundos antes de la expiración

  if (tiempoAdvertencia > 0) {
    if (this.warningTimeout) {
      clearTimeout(this.warningTimeout);
    }

    this.warningTimeout = setTimeout(() => {
      this.mostrarAdvertencia();
    }, tiempoAdvertencia);
  }
}

// Mostrar el modal de advertencia usando PrimeNG
mostrarAdvertencia() {
  const ref = this.dialogService.open(SessionAlertComponent, {
    header: 'Advertencia de expiración de sesión',
    width: '400px',
    closable: false
  });

  ref.onClose.subscribe((extenderSesion: boolean) => {
    if (extenderSesion) {
      console.log('Sesión extendida correctamente');
    }
  });
}


  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    this.router.navigate(['/login']);

    if (this.expirationTimeout) {
      clearTimeout(this.expirationTimeout);
    }

    if (this.warningTimeout) {
      clearTimeout(this.warningTimeout);
    }
  }
}
