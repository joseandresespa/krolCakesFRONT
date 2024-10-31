
import { Component, OnInit } from '@angular/core';
import { CotizacionPedidosService } from 'src/services/cotizacion-pedidos.service';
import { CatalogosService } from 'src/services/catalogos.service';
import { producto } from 'src/app/models/producto.interface';
import { cotizaciononline } from 'src/app/models/cotizaciononline.interface';
import { imagenreferencia } from 'src/app/models/imagenreferencia.interface';
import { desgloseonline } from 'src/app/models/desgloseonline.interface';   
import { Time } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cotizar',
  templateUrl: './cotizar.component.html',
  styleUrls: ['./cotizar.component.css']
})
export class CotizarComponent implements OnInit {

 imagenesSeleccionadas: string[] = [];
  
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
  minFechaEntrega: string | undefined;
  

  constructor(private service: CotizacionPedidosService,private serviceCatalogos: CatalogosService) {}

  ngOnInit(): void {
    this.serviceCatalogos.productos().subscribe((productos) => {
      this.productosDisponibles = productos;
    });
    const today = new Date();
    today.setDate(today.getDate() + 2);
    this.minFechaEntrega = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
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
    this.imagenesSeleccionadas = []; // Reiniciar el array

    for (let i = 0; i < files.length; i++) {
      console.log('Archivo seleccionado:', files[i].name);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenesSeleccionadas.push(e.target.result); // Agregar la URL de la imagen
      };
      reader.readAsDataURL(files[i]);
    }
  }

  enviarCotizacion(): void {
    // Prepara el objeto JSON para enviar como string
    const cotizacion: cotizaciononline = {
      id: 0,
      nombre: this.nombre,
      descripcion: this.descripcion,
      telefono: this.telefono,
      precio_aproximado: this.totalGeneral.toString(),
      envio: this.opcionEntrega === 'recogida' ? false : true,
      fecha: this.fechaEntrega,
      hora: this.horaEntrega,
      direccion: this.opcionEntrega === 'envio' ? this.direccionEnvio : 'Recoge en Pasteleria',
      imagenes: [], // Las imágenes se enviarán como archivos, no aquí
      desgloses: this.productosSeleccionados.map(item => ({
        id_producto: item.producto.id,
        subtotal: item.total,
        cantidad: item.cantidad
      }))
    };
  
    // Convierte el objeto a JSON
    const cotizacionJSON = JSON.stringify(cotizacion);
  
    // Prepara el FormData
    const formData = new FormData();
    
    // Agrega el JSON como un campo de string
    formData.append('nuevoPedidoJSON', cotizacionJSON);
  
    // Agrega cada archivo de imagen al FormData
    const fileInput = document.getElementById('imagenes') as HTMLInputElement;
    if (fileInput && fileInput.files) {
      for (let i = 0; i < fileInput.files.length; i++) {
        formData.append('imagenes', fileInput.files[i]);
      }
    }
  
    // Envía el FormData al servicio
    this.service.enviarCotizacion(formData).subscribe(response => {
      console.log('Cotización enviada con éxito:', response);
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: '¡Cotización enviada con éxito!',
        confirmButtonText: 'Aceptar'
      });
    }, error => {
      console.error('Cotizacion enviada con éxito:', error);
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'La pastelera se comunicara con usted lo mas antes posible',
        confirmButtonText: 'Aceptar'
      });
    });
  }
  
}
