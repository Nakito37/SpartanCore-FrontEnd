import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }


  crearPublicacion(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/publicaciones`, formData, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` })
    });
  }

  obtenerPublicaciones(): Observable<any> {
    return this.http.get(`${this.apiUrl}/publicaciones`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` })
    });
    
  }

  obtenerUserPublicaciones(): Observable<any> {
    return this.http.get(`${this.apiUrl}/publicaciones/user`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` })
    });
  }

  eliminarPublicacion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/publicaciones/${id}`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` })
    });
  }

}


