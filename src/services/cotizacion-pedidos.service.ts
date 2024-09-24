import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Observable } from 'rxjs';
import { cotizaciononline } from 'src/app/models/cotizaciononline.interface';
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
}
