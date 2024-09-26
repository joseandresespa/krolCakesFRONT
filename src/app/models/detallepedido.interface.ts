export interface detallepedido {
    correlativo?: number;
    id_pedido?: number;
    producto_id?: number;
    id_masas?: number;
    id_relleno?: number;
    cantidad_porciones?: number;
    precio_unitario?: number;
    total?: number;
    //para el completo
    sabor_masa?: string;
    sabor_relleno?: string;
    nombre?: string;
  }