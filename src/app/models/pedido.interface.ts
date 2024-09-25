import { desgloseonline } from "./desgloseonline.interface";
import { detallepedido } from "./detallepedido.interface";
import { imagenreferencia } from "./imagenreferencia.interface";
import { observaciones } from "./observaciones.interface";

export interface pedido {
  id?: number;                                   
  id_estado?: number;                           
  observaciones?: string;                        
  estado?: string;                               
  id_cotizacion_online?: string;                 
  descripcion?: string;                          
  precio_aproximado?: number;                    
  envio?: boolean;                               
  hora?: string;                                 
  fecha?: string;                                
  direccion?: string;                            
  estado_cotizacion_online?: boolean;            
  mano_obra?: number;                            
  presupuesto_insumos?: number;                  
  total_presupuesto?: number;                    
  cliente_id?: number;                           
  desglosesOnline?: desgloseonline[];            
  imagenes?: imagenreferencia[];           
  detalles?: detallepedido[];  
  observacionesHistoria?: observaciones[];           
  nombre?: string;                               
  telefono?: number;                             
  nit?: string;                                  
}