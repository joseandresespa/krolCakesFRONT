import { ingresoinventario } from "./ingresoinventario.interface";

export interface comprainventario {
    id?: number;
    total?: number;
    fecha_compra?: Date;
    id_proveedor?: number;
    nombre?: string;
    telefono?: number;
    detalleCompra?: ingresoinventario[];
  }