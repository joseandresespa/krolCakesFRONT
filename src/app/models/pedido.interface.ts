//import { Time } from "@angular/common";

export interface pedido {
    id?: number;
    fecha?: Date;
    hora?: string;
    id_estado?: number;
    id_cliente?: number;
    observaciones?: string;
    direccion?: string;
    id_tipo_entrega?: number;
    precio_total?: number;
  }