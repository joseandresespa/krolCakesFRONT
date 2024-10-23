import { detallecosto } from "./detallecosto.interface";

export interface costo {
    id?: number;
    id_pedido?: number;
    costo?: number;
    ganancia?: number;
    detalles?: detallecosto[];
    id_tipo_pedido: number;
  }