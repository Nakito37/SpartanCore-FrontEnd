import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';  // Asegúrate de cambiar la URL a la correcta si es necesario

  constructor(private http: HttpClient) { }

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
}
