
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Producto {
  nombre: string;
  precio_online: number;
}

interface ProductoSeleccionado {
  producto: Producto;
  cantidad: number;
  total: number;
}

@Component({
  selector: 'app-modal-confirmar',
  templateUrl: './modal-confirmar.component.html',
  styleUrls: ['./modal-confirmar.component.css']
})
export class ModalConfirmarComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalConfirmarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      // Puedes inicializar o manipular los datos aquí si es necesario
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    // Lógica de confirmación
    console.log('Confirmar cotización con datos:', this.data);
    this.dialogRef.close(this.data); // Devuelve los datos actualizados al componente que lo abrió
  }


  agregarProducto(): void {
    if (this.data.productoSeleccionado && this.data.cantidadProducto > 0) {
      const subtotal = (this.data.productoSeleccionado.precio_online || 0) * this.data.cantidadProducto;
      this.data.desgloses.push({
        id_producto: this.data.productoSeleccionado.id_producto,
        nombre_producto: this.data.productoSeleccionado.nombre,  // Aquí agregamos el nombre del producto
        cantidad: this.data.cantidadProducto,
        subtotal
      });
    }
  }
  

  calcularTotalGeneral(): void {
    this.data.totalGeneral = this.data.productosSeleccionados.reduce(
      (sum: number, item: ProductoSeleccionado) => sum + item.total,
      0
    );
  }

  eliminarProducto(index: number): void {
    this.data.productosSeleccionados.splice(index, 1);
    this.calcularTotalGeneral();
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.data.imagenesSeleccionadas = []; // Reiniciar el array

    for (let i = 0; i < files.length; i++) {
      console.log('Archivo seleccionado:', files[i].name);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.data.imagenesSeleccionadas.push(e.target.result); // Agregar la URL de la imagen
      };
      reader.readAsDataURL(files[i]);
    }
  }
}
