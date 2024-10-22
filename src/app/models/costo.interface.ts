import { detallecosto } from "./detallecosto.interface";
import { pastelrealizado } from "./pastelrealizado.interface";

export interface costo {
    id?: number;
    id_pedido?: number;
    costo?: number;
    ganancia?: number;
    detalle?: detallecosto[];
    imagenesRealizado?: pastelrealizado[];
  }