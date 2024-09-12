import { Time } from "@angular/common";
import { desgloseonline } from "./desgloseonline.interface";
import { imagenreferenciaonline } from "./imagenreferenciaonline.interface";

export interface cotizaciononline {
    id?: number;
    nombre?: string;
    descripcion?: string;
    telefono?: number;
    porciones?: number;
    cant_cupcakes?: number;
    precio_aproximado?: string;
    direccion?: string;
    envio?: Boolean;
    fecha?: Date; // Formateado como 'YYYY-MM-DD'
    hora?: Time; // Formateado como 'HH:mm:ss'
    imagenes?: imagenreferenciaonline[];
    desgloses?: desgloseonline[];
  }

  