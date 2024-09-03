import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Observable } from 'rxjs';
import { Usuario, UsuarioCompleto } from 'src/app/models/usuario.interface'; 
import { rol } from 'src/app/models/rol.interface';
@Injectable({
  providedIn: 'root'
})
export class CatalogosService {
  private baseUrl:string = "https://localhost:44373/api/catalogos/"
  constructor(private http : HttpClient) { }

// ---------------------------USUARIOS---------------------------------------
  usuarios(): Observable<UsuarioCompleto[]> {
    return this.http.get<UsuarioCompleto[]>(`${this.baseUrl}usuarios`);
  }
  NuevoUsuario(datos: Usuario): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}nuevo-usuario`, datos);
  }
  ActualizarUsuario(datos: Usuario): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}actualizar-usuario`, datos);
  }
  // ---------------------------ROL---------------------------------------
  roles(): Observable<rol[]> {
    return this.http.get<any[]>(`${this.baseUrl}roles`);
  }
  nuevoRol(datos: any){
    return this.http.post<any>(`${this.baseUrl}nuevo-usuario`, datos);
  }
  ActualizarRol(datos: any){
    return this.http.post<any>(`${this.baseUrl}actualizar-usuario`, datos);
  }
}
