import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { pedido } from 'src/app/models/pedido.interface'; 

@Component({
  selector: 'app-modal-fin-pedido-agenda',
  templateUrl: './modal-fin-pedido-agenda.component.html',
  styleUrls: ['./modal-fin-pedido-agenda.component.css']
})
export class ModalFinPedidoAgendaComponent  {
  imagenesSubidas: string[] = [];
  productos = [
    { nombre: '', cantidad: 1, precio_unitario: 0, subtotal: 0 }
  ];

  constructor(
    public dialogRef: MatDialogRef<ModalFinPedidoAgendaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: pedido,
    private router: Router // Inyectar el Router aquí
  ) { }

  // Método para manejar la subida de imágenes
  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const archivos = Array.from(input.files);
      archivos.forEach((archivo) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagenesSubidas.push(e.target.result);
        };
        reader.readAsDataURL(archivo);
      });
    }
  }

  // Método para eliminar imágenes por índice
  eliminarImagen(index: number): void {
    this.imagenesSubidas.splice(index, 1);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    this.dialogRef.close(this.data);
  }

  listaDeProductos: string[] = [];

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

  openCosto(pedido: pedido): void {
    // Navegar a la ruta del componente CostoComponent
    this.dialogRef.close();
    this.router.navigate(['/costo'], {
      queryParams: { pedidoId: pedido.id } 
    });
  }
}
