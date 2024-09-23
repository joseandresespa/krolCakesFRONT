
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { pedido } from 'src/app/models/pedido.interface';

@Component({
  selector: 'app-modal-agregar-pedido',
  templateUrl: './modal-agregar-pedido.component.html',
  styleUrls: ['./modal-agregar-pedido.component.css']
})
export class ModalAgregarPedidoComponent implements OnInit {
  observacion: string = ''; // Inicializar la propiedad observacion
  observaciones: string[] = []; // Array para almacenar observaciones
  observacionSeleccionada: string | null = null; // Almacena la observación seleccionada para mostrarla
  imagenesSubidas: string[] = []; // Inicializar como arreglo vacío (imagenes)
  pedidoForm!: FormGroup;
  manoDeObra: number = 0;
  insumos: number = 0;
  presupuestoTotal: number = 0;

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
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalAgregarPedidoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: pedido) {
      
    }

  ngOnInit(): void {
    this.pedidoForm = this.fb.group({
      fecha: [null, Validators.required],
      hora: ['', Validators.required],
      id_estado: [null, Validators.required],
      id_cliente: [null, Validators.required],
      observaciones: [''],
      direccion: ['', Validators.required],
      id_tipo_entrega: [null, Validators.required],
      precio_total: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.pedidoForm.valid) {
      this.dialogRef.close(this.pedidoForm.value); // Retornar el formulario para ser procesado por el componente padre
    }
  }

  onCancel(): void {
    this.dialogRef.close();
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


// Función para agregar la observación al array
addObservation() {
 if (this.observacion.trim()) {
   this.observaciones.push(this.observacion); // Agregar la observación
   this.observacion = ''; // Limpiar el campo de texto
 }
}

// Función para mostrar la observación seleccionada al hacer clic en "Ver"
verObservacion(observacion: string) {
 this.observacionSeleccionada = observacion;
}

// Función para eliminar una observación específica
eliminarObservacion(index: number) {
 this.observaciones.splice(index, 1); // Eliminar la observación en el índice especificado
 if (this.observacionSeleccionada === this.observaciones[index]) {
   this.observacionSeleccionada = null; // Limpiar la observación seleccionada si fue eliminada
 }
}

// Confirmar todas las observaciones
confirmObservation() {
 console.log('Observaciones confirmadas:', this.observaciones);
 this.dialogRef.close({ observaciones: this.observaciones });
}
  

calcularPresupuestoTotal(): void {
  this.presupuestoTotal = this.manoDeObra + this.insumos;
}

}
