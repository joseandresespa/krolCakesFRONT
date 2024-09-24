import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { cotizaciononline } from 'src/app/models/cotizaciononline.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SesionService {
  private baseUrl:string = "https://localhost:44373/api/login/"
  constructor(private http : HttpClient) { }
  sesion(credenciales: any){
    return this.http.post<any>(`${this.baseUrl}sesion`, credenciales);
  }

    // ---------------------------COTIZACION ONLINE---------------------------------------
    enviarCotizacion(cotizacion: cotizaciononline): Observable<any> {
      return this.http.post<any>( `${this.baseUrl}nueva-cotizaciononline`, cotizacion);
    }

    cotizaciones(): Observable<cotizaciononline[]> {
      return this.http.get<any[]>(`${this.baseUrl}cotizaciononline`);
    }

}
