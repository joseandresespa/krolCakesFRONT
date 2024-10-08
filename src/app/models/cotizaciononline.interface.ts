import { Time } from "@angular/common";
import { desgloseonline } from "./desgloseonline.interface";
import { imagenreferenciaonline } from "./imagenreferenciaonline.interface";
import { observaciones } from "./observaciones.interface";

export interface cotizaciononline {
    id: number;
    nombre?: string;
    descripcion?: string;
    telefono?: number;
    precio_aproximado?: string;
    direccion?: string;
    estado?: number;
    envio?: Boolean;
    fecha?: Date; // Formateado como 'YYYY-MM-DD'
    hora?: Time; // Formateado como 'HH:mm:ss'
    imagenes?: imagenreferenciaonline[];
    desgloses?: desgloseonline[];
    observacion?: observaciones[];
  }

  