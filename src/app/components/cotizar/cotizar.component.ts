import { Component } from '@angular/core';

@Component({
  selector: 'app-cotizar',
  templateUrl: './cotizar.component.html',
  styleUrls: ['./cotizar.component.css']
})
export class CotizarComponent {
  selectedDate: string = '';
  saborPastel: string = '';
  cantidadPorciones: number = 1; // Inicializa la cantidad de porciones
  cantidadPisos: number = 1;
  selectedFiles: File[] = []; // Agrega esta línea para almacenar las imágenes seleccionadas
  selectedTime: string = ''; // Para almacenar la hora
  dulces: { tipo: string; cantidad: number }[] = [{ tipo: '', cantidad: 1 }];
  tipoEnvio: string = '';
  direccionEnvio: string = '';

  onEnvioChange(value: string) {
    this.tipoEnvio = value;
    if (value === 'local') {
      this.direccionEnvio = ''; // Limpiar la dirección si elige "Local"
    }
  }

    agregarDulce() {
        this.dulces.push({ tipo: '', cantidad: 1 });
    }
    eliminarDulce(index: number) {
      this.dulces.splice(index, 1); // Elimina el dulce en la posición index
  }

  pasteles: { sabor: string, pisos: number, porciones: number }[] = [];

    agregarPastel() {
        this.pasteles.push({ sabor: '', pisos: 1, porciones: 1 });
    }

    eliminarPastel(index: number) {
        this.pasteles.splice(index, 1);
    }
  
  

  // Método para manejar la selección de archivos
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files); // Convierte FileList a un array
    }
  }

  clearImages() {
    this.selectedFiles = []; // Limpia la lista de archivos seleccionados
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (input) {
      input.value = ''; // Resetea el campo de entrada de archivos
    }
  }
  // Método para obtener la URL de la imagen
  getImageUrl(file: File): string {
    return URL.createObjectURL(file);
}

  handleKeyDown(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (!allowedKeys.includes(event.key) && event.key.length !== 1) {
      event.preventDefault();
    }
  }

  onDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    if (!isNaN(Date.parse(value))) {
      this.selectedDate = value;
    }
  }

  confirmDate() {
    const inputField = document.querySelector('input[type="date"]') as HTMLInputElement;
    inputField.value = this.selectedDate; // Asegura que la fecha se quede establecida
  }
}

