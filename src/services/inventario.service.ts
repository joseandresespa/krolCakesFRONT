import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { comprainventario } from 'src/app/models/comprainventario.interface';
import { salidainventario } from 'src/app/models/salidainventario.interface';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private baseUrl:string = "http://localhost:80/apikrolcakes/api/inventario/"
  constructor(private http : HttpClient) { }

  compras(): Observable<comprainventario[]> {
    return this.http.get<comprainventario[]>(`${this.baseUrl}compras`);
  }

  nuevaCompra(data: any) {
    return this.http.post<any>(`${this.baseUrl}nueva-compra`, data);
  }


  salidas(): Observable<salidainventario[]> {
    return this.http.get<salidainventario[]>(`${this.baseUrl}salidas`);
  }

  nuevaSalida(data: any) {
    return this.http.post<any>(`${this.baseUrl}nueva-salida`, data);
  }
}
