import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { producto } from 'src/app/models/producto.interface'; //ruta del modelo "producto"
import { CatalogosService } from 'src/services/catalogos.service';
@Component({
  selector: 'app-modal-confirmar',
  templateUrl: './modal-confirmar.component.html',
  styleUrls: ['./modal-confirmar.component.css']
})
export class ModalConfirmarComponent {
  
  productosDisponibles: producto[] = []; // Inicializa como un array vacío

  constructor(
    public dialogRef: MatDialogRef<ModalConfirmarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: CatalogosService ) {
      // Inicializa los valores si son undefined
      this.data.manoDeObra = this.data.manoDeObra || 0;
      this.data.insumos = this.data.insumos || 0;
      this.data.presupuestoTotal = this.data.presupuestoTotal || 0;
  }

  ngOnInit(): void {
    this.service.productos().subscribe((productos: producto[]) => {
      this.productosDisponibles = productos;
    }, error => {
      console.error('Error al cargar productos disponibles', error);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    console.log('Confirmar cotización con datos:', this.data);
    this.dialogRef.close(this.data); // Devuelve los datos actualizados al componente que lo abrió
  }

  agregarProducto(): void {
    // Agregar un nuevo objeto para el producto seleccionado
    this.data.desgloses.push({
      id: undefined,
      nombre: '',
      descripcion: '',
      precio_online: 0,
      cantidad: 1,
      subtotal: 0
    });
  }

  eliminarProducto(index: number): void {
    this.data.desgloses.splice(index, 1); // Cambiar a desgloses
    this.calcularTotalGeneral(); // Recalcular el total general después de eliminar
  }

  actualizarSubtotal(item: any): void {
    const cantidad = item.cantidad || 0;
    const precio = item.precio_online || 0;

    item.subtotal = cantidad * precio;

    this.calcularTotalGeneral();
  }
  
  calcularTotalGeneral(): void {
    this.data.totalGeneral = this.data.desgloses.reduce(
      (sum: number, item: any) => sum + (item.subtotal || 0),
      0
    );
  }

  calcularPresupuestoTotal(): void {
    this.data.presupuestoTotal = (this.data.manoDeObra || 0) + (this.data.insumos || 0);
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

