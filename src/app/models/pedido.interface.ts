import { desgloseonline } from "./desgloseonline.interface";
import { detallepedido } from "./detallepedido.interface";
import { imagenreferencia } from "./imagenreferencia.interface";
import { observaciones } from "./observaciones.interface";

export interface pedido {
  id?: number;                          // Proviene del modelo pedido
  id_estado?: number;                   // Proviene del modelo pedido
  observaciones?: string;               // Proviene del modelo pedido
  id_cotizacion_online?: string;        // Proviene del modelo pedido

  estado?: string;                      // Proviene del modelo estado
 
  descripcion?: string;                 // Proviene del modelo cotizacion online
  precio_aproximado?: number;           // Proviene del modelo cotizacion online
  envio?: boolean;                      // Proviene del modelo cotizacion online
  hora?: string;                        // Proviene del modelo cotizacion online
  fecha?: string;                       // Proviene del modelo cotizacion online
  direccion?: string;                   // Proviene del modelo cotizacion online
  estado_cotizacion_online?: boolean;   // Proviene del modelo cotizacion online
  mano_obra?: number;                   // Proviene del modelo cotizacion online
  presupuesto_insumos?: number;         // Proviene del modelo cotizacion online
  total_presupuesto?: number;           // Proviene del modelo cotizacion online
  cliente_id?: number;                  // Proviene del modelo cotizacion online

  desgloses?: desgloseonline[];   // Lista de desglosesOnline
  imagenes?: imagenreferencia[];  // Lista de imagenes
  detalles?: detallepedido[];   // Lista de detalles
  Observacion?: observaciones[];  // Lista de observaciones

  nombre?: string;                      // Proviene del modelo cliente
  telefono?: number;                    // Proviene del modelo cliente
  nit?: string;                         // Proviene del modelo cliente
}