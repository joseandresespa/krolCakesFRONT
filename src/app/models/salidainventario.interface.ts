export interface salidainventario {
    id?: number;
    fecha?: string;
    notas?: string;
    detalleSalida?: salidaInventarioDetalle[];
  }

  export interface salidaInventarioDetalle {
    correlativo?: number;
    cantidad?: number;
    id_insumo_utensilio?: number;
    nombre?: string;
    id_motivo_salida?: number;
    motivo?: string;
    id_unidad_medida?: number;
    unidad?: string;
    id_encabezado_salida?: number;
  }