import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { cotizaciononline } from 'src/app/models/cotizaciononline.interface';

@Component({
  selector: 'app-modal-observacion',
  templateUrl: './modal-observacion.component.html',
  styleUrls: ['./modal-observacion.component.css']
})
export class ModalObservacionComponent {
  observacion: string = ''; // Inicializar la propiedad observacion
  observaciones: string[] = []; // Array para almacenar observaciones
  observacionSeleccionada: string | null = null; // Almacena la observación seleccionada para mostrarla
  imagenesSubidas: string[] = []; // Inicializar como arreglo vacío (imagenes)

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
    public dialogRef: MatDialogRef<ModalObservacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: cotizaciononline
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
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
}
