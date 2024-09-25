import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Observable } from 'rxjs';
import { Usuario, UsuarioCompleto } from 'src/app/models/usuario.interface'; 
import { rol } from 'src/app/models/rol.interface';
import { cotizaciononline } from 'src/app/models/cotizaciononline.interface';
import { producto } from 'src/app/models/producto.interface';
import { cliente } from 'src/app/models/cliente.interface';
import { receta } from 'src/app/models/receta.interface';
import { proveedor } from 'src/app/models/proveedor.interface';
import { unidadmedidapreciosugerido } from 'src/app/models/unidadmedidapreciosugerido.interface';
import { estado } from 'src/app/models/estado.interface';
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
    return this.http.post<any>(`${this.baseUrl}nuevo-rol`, datos);
  }
  ActualizarRol(datos: any){
    return this.http.post<any>(`${this.baseUrl}actualizar-rol`, datos);
  }
  // ---------------------------PRODUCTO---------------------------------------
  productos(): Observable<producto[]> {
    return this.http.get<producto[]>(`${this.baseUrl}productos`);
  }
  nuevoProducto(datos: any){
    return this.http.post<any>(`${this.baseUrl}nuevo-producto`, datos);
  }
  actualizarProducto(datos: any){
    return this.http.post<any>(`${this.baseUrl}actualizar-producto`, datos);
  }
  // ---------------------------CLIENTE---------------------------------------
  clientes(): Observable<cliente[]> {
    return this.http.get<any[]>(`${this.baseUrl}clientes`);
  }
  actualizarCliente(datos: any){
    return this.http.post<any>(`${this.baseUrl}actualizar-cliente`, datos);
  }
  // ---------------------------RECETA---------------------------------------
  recetas(): Observable<receta[]> {
    return this.http.get<any[]>(`${this.baseUrl}recetas`);
  }
  nuevaReceta(datos: any){
    return this.http.post<any>(`${this.baseUrl}nueva-receta`, datos);
  }
  actualizarReceta(datos: any){
    return this.http.post<any>(`${this.baseUrl}actualizar-receta`, datos);
  }
    // ---------------------------PROVEEDORES---------------------------------------
    proveedores(): Observable<proveedor[]> {
      return this.http.get<any[]>(`${this.baseUrl}proveedores`);
    }
    nuevoProveedor(datos: any){
      return this.http.post<any>(`${this.baseUrl}nuevo-proveedor`, datos);
    }
    actualizarProveedores(datos: any){
      return this.http.post<any>(`${this.baseUrl}actualizar-proveedor`, datos);
    }

    // ---------------------------UMPS---------------------------------------
    unidadesPS(): Observable<unidadmedidapreciosugerido[]> {
      return this.http.get<any[]>(`${this.baseUrl}unidad-medida-precio-sugerido`);
    }
    nuevaUnidadPS(datos: any){
      return this.http.post<any>(`${this.baseUrl}nueva-unidad-medida-precio-sugerido`, datos);
    }
    actualizarUnidadPS(datos: any){
      return this.http.post<any>(`${this.baseUrl}actualizar-unidad-medida-precio-sugerido`, datos);
    }
    // ---------------------------MOTIVO SALIDA---------------------------------------
    motivoSalida(): Observable<unidadmedidapreciosugerido[]> {
      return this.http.get<any[]>(`${this.baseUrl}motivos-salida`);
    }
    nuevoMotivoSalida(datos: any){
      return this.http.post<any>(`${this.baseUrl}nuevo-motivo-salida`, datos);
    }
    actualizarMotivoSalida(datos: any){
      return this.http.post<any>(`${this.baseUrl}actualizar-motivo-salida`, datos);
    } 
    // ---------------------------Masas---------------------------------------
    masas(): Observable<unidadmedidapreciosugerido[]> {
      return this.http.get<any[]>(`${this.baseUrl}masas`);
    }
    nuevaMasa(datos: any){
      return this.http.post<any>(`${this.baseUrl}nueva-masa`, datos);
    }
    actualizarMasa(datos: any){
      return this.http.post<any>(`${this.baseUrl}actualizar-masa`, datos);
    } 
    // ---------------------------Rellenos---------------------------------------
    rellenos(): Observable<unidadmedidapreciosugerido[]> {
      return this.http.get<any[]>(`${this.baseUrl}rellenos`);
    }
    nuevoRelleno(datos: any){
      return this.http.post<any>(`${this.baseUrl}nuevo-relleno`, datos);
    }
    actualizarRelleno(datos: any){
      return this.http.post<any>(`${this.baseUrl}actualizar-relleno`, datos);
    }
    // ---------------------------Estado---------------------------------------
    estado(): Observable<estado[]> {
      return this.http.get<any[]>(`${this.baseUrl}estados`);
    }              
    
}
