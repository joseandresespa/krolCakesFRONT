import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { pedido } from 'src/app/models/pedido.interface'; 

@Component({
  selector: 'app-modal-pedido-desglose',
  templateUrl: './modal-pedido-desglose.component.html',
  styleUrls: ['./modal-pedido-desglose.component.css']
})
export class ModalPedidoDesgloseComponent {
  imagenesSubidas: string[] = []; // Inicializar como arreglo vacío (imagenes)
  

  productos = [
    { nombre: '', cantidad: 1, precio_unitario: 0, subtotal: 0 }
  ];

  // Método para manejar la subida de imágenes
  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const archivos = Array.from(input.files);
      archivos.forEach((archivo) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagenesSubidas.push(e.target.result); // Guardar la imagen 
        };
        reader.readAsDataURL(archivo); // Convertir la imagen a base64 para mostrarla
      });
    }
  }
  // Método para eliminar imagenes por índice
eliminarImagen(index: number): void {
  this.imagenesSubidas.splice(index, 1);
}

  
  constructor(
    public dialogRef: MatDialogRef<ModalPedidoDesgloseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: pedido
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    this.dialogRef.close(this.data); //  acción adicional si es necesario
  }

   // Lista de productos para el dropdown
   listaDeProductos: string[] = [];

   // Funciones existentes
   agregarProducto() {
     this.productos.push({ nombre: '', cantidad: 1, precio_unitario: 0, subtotal: 0 });
   }
 
   eliminarProducto(index: number) {
     this.productos.splice(index, 1);
   }
 
   actualizarSubtotal(producto: any) {
     producto.subtotal = producto.cantidad * producto.precio_unitario;
   }
 
   calcularTotalGeneral() {
     return this.productos.reduce((total, producto) => total + producto.subtotal, 0);
   }
 }
