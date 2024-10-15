import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;  
  private expirationTimeout: any;
  private warningTimeout: any;
  

  constructor(private http: HttpClient, private router: Router) { }

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
    console.log("guardarToken: ", token);
    
    const expirationTime = new Date().getTime() + expiresIn;
    const decodedToken: any = jwtDecode(token);
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiration', expirationTime.toString());
    localStorage.setItem('usuario', decodedToken.nombre_usuario);

    this.expAdvertencia(expiresIn);
    console.log("tokenInf: ", decodedToken);
    
  }


  obtenerToken() {
    return localStorage.getItem('token');
  }

  obtenerIdUsuario(): number{
    const token = this.obtenerToken();
    if (token) {      
      const decodedToken: any = jwtDecode(token);
      return decodedToken.id_usuario;
    }
    console.log("No existe token");
    return 0;
  }

  obtenerUsuario(): string | null {
    return localStorage.getItem('usuario');
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
    if (now > expirationTime) {
      this.logout();
      return false;
    }

    console.log("Estas autenticado");
    return true;
  }


   // Cierre de sesión cuando el token expire
   programarExpiracion(expiresIn: number) {
    if (this.expirationTimeout) {
      clearTimeout(this.expirationTimeout); 
    }

    this.expirationTimeout = setTimeout(() => {
      this.logout();
      console.log("Sesion expirada");
      

    }, expiresIn);
  }


 // Advertencia antes de que el token expire
 expAdvertencia(expirationTime: number) {
  const tiempo = 60 * 6.8 * 1000;
  const tiempoRestante = expirationTime - new Date().getTime();
  const tiempoAdvertencia = tiempoRestante - tiempo;

  if (tiempoAdvertencia > 0) {
    if (this.warningTimeout) {
      clearTimeout(this.warningTimeout);
    }

    this.warningTimeout = setTimeout(() => {
      console.log("Sesion a punto de expirar: " + tiempoAdvertencia + "ms");
      
      this.modalAdvertencia();
    }, tiempoAdvertencia);
  }
}

modalAdvertencia() {

}


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('tokenExpiration')
    this.router.navigate(['/login']);

    if (this.expirationTimeout) {
      clearTimeout(this.expirationTimeout);
    }

    if (this.warningTimeout) {
      clearTimeout(this.warningTimeout);
    }
  }
}
