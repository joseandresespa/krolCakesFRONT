import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Observable } from 'rxjs';
import { cotizaciononline } from 'src/app/models/cotizaciononline.interface';
import { pedido } from 'src/app/models/pedido.interface';
@Injectable({
  providedIn: 'root'
})
export class CotizacionPedidosService {
  private baseUrl:string = "https://localhost:44373/api/CotizacionPedido/"
  constructor(private http : HttpClient) { }


  // ---------------------------COTIZACION ONLINE---------------------------------------
  enviarCotizacion(cotizacion: cotizaciononline): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}nueva-cotizaciononline`, cotizacion);
  }

  cotizaciones(): Observable<cotizaciononline[]> {
    return this.http.get<any[]>(`${this.baseUrl}cotizaciononline`);
  }
    // ---------------------------CONFIRMAR COTIZACION ONLINE---------------------------------------

  confirmarCotizacion(datos: any){
    return this.http.post<any>(`${this.baseUrl}confirmar-cotizacion`, datos);
  }
    // ---------------------------INSERTAR IMAGENES Y OBSERVACION---------------------------------------
    InsertarImagenObs(datos: any) {
      const formData = new FormData();
    
      // Agregar las imágenes al FormData
      datos.imagenes.forEach((imagen: File) => {
        formData.append('imagenes', imagen);
      });
    
      // Agregar la observación y el ID de cotización
      formData.append('observacion', datos.observacion);
      formData.append('id_cotizacion_online', datos.id_cotizacion_online);
    
      // Enviar la solicitud HTTP con el FormData
      return this.http.post<any>(`${this.baseUrl}insertar-imagen-observacion`, formData);
    }
    // ---------------------------PEDIDO---------------------------------------
    pedidos(): Observable<pedido[]> {
      return this.http.get<any[]>(`${this.baseUrl}pedidos`);
    }
    nuevoPedido(datos: any){
      return this.http.post<any>(`${this.baseUrl}nuevo-pedido`, datos);
    }
    cambioEstadoPedido(id_pedido: number,id_status: number){
      const datos = {
        id_pedido: id_pedido,
        id_estado: id_status
      };
      return this.http.post<any>(`${this.baseUrl}cambio-estado-pedido`, datos);
    } 


}
