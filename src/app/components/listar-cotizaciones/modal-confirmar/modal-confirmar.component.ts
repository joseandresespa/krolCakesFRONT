import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { masa } from 'src/app/models/masa.interface';
import { producto } from 'src/app/models/producto.interface'; //ruta del modelo "producto"
import { relleno } from 'src/app/models/relleno.interface';
import { CatalogosService } from 'src/services/catalogos.service';
import { pedido } from 'src/app/models/pedido.interface';
import { CotizacionPedidosService } from 'src/services/cotizacion-pedidos.service';
@Component({
  selector: 'app-modal-confirmar',
  templateUrl: './modal-confirmar.component.html',
  styleUrls: ['./modal-confirmar.component.css']
})
export class ModalConfirmarComponent {
  isConfirmButtonDisabled: boolean = true;// Logica para el boton
  productosDisponibles: producto[] = []; // Inicializa como un array vacío
  rellenos: relleno[] = [];
  masas: masa[] = [];

  constructor(
    public dialogRef: MatDialogRef<ModalConfirmarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: CatalogosService ,
    private serviceCotizacion: CotizacionPedidosService) {
      // Inicializa los valores si son undefined
      this.data.manoDeObra = this.data.manoDeObra || 0;
      this.data.insumos = this.data.insumos || 0;
      this.data.presupuestoTotal = this.data.presupuestoTotal || 0;
  }

  ngOnInit(): void {
    // Al inicializar, verifica el estado del botón
    this.verificarEstadoBoton();

    this.service.productos().subscribe((productos: producto[]) => {
      this.productosDisponibles = productos;
  
      // Asigna el producto correspondiente en base al id_producto del desglose
      this.data.desgloses.forEach((item: any) => {
        const productoEncontrado = this.productosDisponibles.find(p => p.id === item.id_producto);
        if (productoEncontrado) {
          item.producto = productoEncontrado; // Asigna el producto completo al desglose
        }
      });
    }, error => {
      console.error('Error al cargar productos disponibles', error);
    });

    this.service.masas().subscribe(data => {
      this.masas = data;
    });

    this.service.rellenos().subscribe(data => {
      this.rellenos = data;
    });
  }
  

  compararProductos(p1: producto, p2: producto): boolean {
    return p1 && p2 ? p1.id === p2.id : p1 === p2;
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    console.log('Confirmar cotización con datos:', this.data);
    const cotizacionmodel: pedido = {
      id_cotizacion_online: this.data.id,
      observaciones: this.data.observaciones,
      detalles: this.data.desgloses.map((item: any) => ({
        producto_id: item.producto.id,
        id_masas: item.masa.id,
        id_relleno: item.relleno.id,
        cantidad_porciones: item.cantidad,
        precio_unitario: item.precio,
        total: item.subtotal,
      })),
      presupuesto_insumos: this.data.insumos,
      total_presupuesto: this.data.presupuestoTotal,
      mano_obra: this.data.manoDeObra
    };
    console.log('modelo nuevo:', cotizacionmodel);
    this.serviceCotizacion.confirmarCotizacion(cotizacionmodel).subscribe(
      response => {
        console.log('Cotización confirmada exitosamente:', response);
        // Puedes cerrar el modal después de confirmar
        this.dialogRef.close(response);
      },
      error => {
        console.error('Error al confirmar la cotización:', error);
      }
    );
  }

  agregarProducto(): void {
    this.data.desgloses.push({
      id_producto: null, // Producto aún no seleccionado
      producto: null,    // Se inicializa como null para el combo
      cantidad: 1,
      precio: 0,         // Inicializa el precio en 0 para que sea manual
      subtotal: 0
    });
  }
  

  eliminarProducto(index: number): void {
    this.data.desgloses.splice(index, 1); // Cambiar a desgloses
    this.calcularTotalGeneral(); // Recalcular el total general después de eliminar
  }

  actualizarSubtotal(item: any): void {
    const cantidad = item.cantidad || 0;
    const precio = item.precio || 0; // Ahora usamos item.precio
  
    item.subtotal = cantidad * precio;
  
    this.calcularTotalGeneral();
  }
  
  calcularTotalGeneral(): void {
    this.data.totalGeneral = this.data.desgloses.reduce(
      (sum: number, item: any) => sum + (item.subtotal || 0),
      0
    );
    this.verificarEstadoBoton();// Logica para el boton
  }

  calcularPresupuestoTotal(): void {
    this.data.presupuestoTotal = (this.data.manoDeObra || 0) + (this.data.insumos || 0);
    this.verificarEstadoBoton();// Logica para el boton
  }

  verificarEstadoBoton(): void {
    this.isConfirmButtonDisabled = this.data.totalGeneral !== this.data.presupuestoTotal;// Logica para el boton
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.data.imagenesSeleccionadas = []; // Reiniciar el array

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.data.imagenesSeleccionadas.push(e.target.result); // Agregar la URL de la imagen
      };
      reader.readAsDataURL(files[i]);
    }
  }
}

