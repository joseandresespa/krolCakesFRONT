import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"


@Injectable({
  providedIn: 'root'
})
export class SesionService {
  private baseUrl:string = "https://localhost:44304/api/krolCakes"
  constructor(private http : HttpClient) { }

}
