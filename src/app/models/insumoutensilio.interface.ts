export interface insumoutensilio {
    id?: number;
    id_tipo_insumo?: number;
    nombre?: string;
    id_unidad_medida?: number;
    precio_unitario?: number;
    cantidad?: number;
    inventarioRenovable?: Boolean;
    fecha_ingreso?: Date;
    fecha_vencimiento?: Date;
  }