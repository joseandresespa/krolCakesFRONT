import { Component, OnInit } from '@angular/core';
import { CatalogosService } from 'src/services/catalogos.service';
import { producto } from 'src/app/models/producto.interface';
import { cotizaciononline } from 'src/app/models/cotizaciononline.interface';
import { imagenreferencia } from 'src/app/models/imagenreferencia.interface';
import { desgloseonline } from 'src/app/models/desgloseonline.interface';   
import { Time } from '@angular/common';

@Component({
  selector: 'app-cotizar',
  templateUrl: './cotizar.component.html',
  styleUrls: ['./cotizar.component.css']
})
export class CotizarComponent implements OnInit {
  productosDisponibles: producto[] = [];
  productosSeleccionados: { producto: producto; cantidad: number; total: number }[] = [];
  totalGeneral: number = 0;

  productoSeleccionado!: producto;
  cantidadProducto: number = 1;

  descripcion: string = ''; // Agregar descripción
  opcionEntrega: string = 'recogida'; // Agregar opción de entrega
  direccionEnvio: string = ''; // Agregar dirección si es envío a domicilio
  fechaEntrega: Date| undefined;; // Agregar fecha de entrega
  horaEntrega: Time | undefined; // Agregar hora de entrega
  nombre: string = ''; 
  telefono: number | undefined; 

  constructor(private service: CatalogosService) {}

  ngOnInit(): void {
    this.service.productos().subscribe((productos) => {
      this.productosDisponibles = productos;
    });
  }

  agregarProducto(): void {
    if (this.productoSeleccionado && this.cantidadProducto > 0) {
      const total = (this.productoSeleccionado.precio_online || 0) * this.cantidadProducto;
      this.productosSeleccionados.push({ producto: this.productoSeleccionado, cantidad: this.cantidadProducto, total });
      this.calcularTotalGeneral();
    }
  }

  calcularTotalGeneral(): void {
    this.totalGeneral = this.productosSeleccionados.reduce((sum, item) => sum + item.total, 0);
  }

  eliminarProducto(index: number): void {
    this.productosSeleccionados.splice(index, 1);
    this.calcularTotalGeneral();
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      console.log('Archivo seleccionado:', files[i].name);
    }
  }

  enviarCotizacion(): void {
    const cotizacion: cotizaciononline = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      telefono: this.telefono,  
      precio_aproximado: this.totalGeneral.toString(),  
      envio: this.opcionEntrega === 'envio'? true : false,
      fecha: this.fechaEntrega,
      hora: this.horaEntrega,
      direccion: this.opcionEntrega === 'envio' ? this.direccionEnvio : '',
      imagenes: [],  
      desgloses: this.productosSeleccionados.map(item => ({
        id_producto: item.producto.id,
        subtotal: item.total,
        cantidad: item.cantidad
      }))
    };

    console.log(cotizacion);

    this.service.enviarCotizacion(cotizacion).subscribe(response => {
      console.log('Cotización enviada con éxito:', response);
    }, error => {
      console.error('Error al enviar cotización:', error);
    });
  }
}
