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
import { tipoevento } from 'src/app/models/tipoevento.interface';
import { insumoutensilio } from 'src/app/models/insumoutensilio.interface';
import { tipoinsumoutensilio } from 'src/app/models/tipoinsumoutensilio.interface';
import { MotivoSalida } from 'src/app/models/motivosalida.interface';
import { masa } from 'src/app/models/masa.interface';
import { relleno } from 'src/app/models/relleno.interface';
import { unidadmedida } from 'src/app/models/unidadmedida.interface';
import { pastelrealizado } from 'src/app/models/pastelrealizado.interface';
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


    // ---------------------------Masas---------------------------------------
    masas(): Observable<masa[]> {
      return this.http.get<any[]>(`${this.baseUrl}masas`);
    }
    nuevaMasa(datos: any){
      return this.http.post<any>(`${this.baseUrl}nueva-masa`, datos);
    }
    actualizarMasa(datos: any){
      return this.http.post<any>(`${this.baseUrl}actualizar-masa`, datos);
    } 
    // ---------------------------Rellenos---------------------------------------
    rellenos(): Observable<relleno[]> {
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
    nuevoEstado(datos: any){
      return this.http.post<any>(`${this.baseUrl}nuevo-estado`, datos);
    }
    actualizarEstado(datos: any){
      return this.http.post<any>(`${this.baseUrl}actualizar-estado`, datos);
    }          
    // ---------------------------TipoEvento---------------------------------------
  tipoEvento(): Observable<tipoevento[]> {
    return this.http.get<tipoevento[]>(`${this.baseUrl}tipos-evento`);
  }
  nuevoTipoEvento(datos: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}nuevo-tipo-evento`, datos);
  }
  ActualizarTipoEvento(datos: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}actualizar-tipo-evento`, datos);
  }
      // ---------------------------TipoEvento---------------------------------------
  tipoInsumoUtensilio(): Observable<tipoinsumoutensilio[]> {
    return this.http.get<tipoinsumoutensilio[]>(`${this.baseUrl}tipos-insumo-utensilio`);
  }
  nuevoTipoInsumoUtensilio(datos: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}nuevo-tipo-insumo-utensilio`, datos);
  }
  ActualizarTipoInsumoUtensilio(datos: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}actualizar-tipo-insumo-utensilio`, datos);
  }
       // ---------------------------TipoSalida---------------------------------------
  tipoSalida(): Observable<MotivoSalida[]> {
    return this.http.get<MotivoSalida[]>(`${this.baseUrl}motivos-salida`);
  }
  nuevoTipoSalida(datos: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}nuevo-motivo-salida`, datos);
  }
  ActualizarTipoSalida(datos: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}actualizar-motivo-salida`, datos);
  }
  
  // ---------------------------TipoIsumo---------------------------------------
  insumos(): Observable<insumoutensilio[]> {
    return this.http.get<insumoutensilio[]>(`${this.baseUrl}insumos`);
  }
  nuevoInsumo(datos: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}nuevo-insumo`, datos);
  }
  Actualizarinsumo(datos: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}actualizar-insumo`, datos);
  }

  // ---------------------------UMPS---------------------------------------
  unidadesCosto(): Observable<unidadmedidapreciosugerido[]> {
    return this.http.get<any[]>(`${this.baseUrl}unidad-medida-precio-sugerido`);
  }
  nuevaUnidadCosto(datos: any){
    return this.http.post<any>(`${this.baseUrl}nueva-unidad-medida-precio-sugerido`, datos);
  }
  actualizarUnidadCosto(datos: any){
    return this.http.post<any>(`${this.baseUrl}actualizar-unidad-medida-precio-sugerido`, datos);
  }
  // ---------------------------UMInventario---------------------------------------
  unidadesInventario(): Observable<unidadmedida[]> {
    return this.http.get<any[]>(`${this.baseUrl}unidad-medida-inventario`);
  }
  nuevaUnidadInventario(datos: any){
    return this.http.post<any>(`${this.baseUrl}nueva-unidad-medida-inventario`, datos);
  }
  actualizarUnidadInventario(datos: any){
    return this.http.post<any>(`${this.baseUrl}actualizar-unidad-medida-inventario`, datos);
  }
  pastelesRealizados(): Observable<pastelrealizado[]> {
    return this.http.get<any[]>(`${this.baseUrl}pastel-realizado`);
  }

}
