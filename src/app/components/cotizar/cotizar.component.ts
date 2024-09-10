import { Component } from '@angular/core';

@Component({
  selector: 'app-cotizar',
  templateUrl: './cotizar.component.html',
  styleUrls: ['./cotizar.component.css']
})
export class CotizarComponent {
  selectedDate: string | null = null;
  selectedTime: string | null = null;
  saborPastel: string = '';
  cantidadPorciones: number = 1;
  cantidadPisos: number = 1;
  selectedFiles: File[] = [];
  dulces: any[] = [];
  pasteles: any[] = [];
  tipoEnvio: string = 'local';  
  direccionEnvio: string = '';
  envioLocal: boolean = true;  

  // Precios de los dulces
  preciosDulces: { [key: string]: number } = {
    'Cupcakes': 1.50,
    'Alfajores': 2.00,
    'Galletas': 1.00,
    'Paletas': 2.50,
    'Cakepops': 1.75,
    'Macarons': 3.00
  };

  onEnvioChange(tipo: string) {
    if (tipo === 'local') {
        this.envioLocal = true;
        this.tipoEnvio = 'local'; // Actualiza el tipo de envío
        this.direccionEnvio = ''; // Limpia la dirección si es entrega local
    } else {
        this.envioLocal = false;
        this.tipoEnvio = 'domicilio'; // Actualiza el tipo de envío
    }
}

  agregarDulce() {
    this.dulces.push({ tipo: '', cantidad: 1, precio: 0 });
  }

  eliminarDulce(index: number) {
    this.dulces.splice(index, 1);
  }

  actualizarPrecio(dulce: any) {
    dulce.precio = this.preciosDulces[dulce.tipo] || 0;
  }

  agregarPastel() {
    this.pasteles.push({ sabor: '', pisos: 1, porciones: 1 });
  }

  eliminarPastel(index: number) {
    this.pasteles.splice(index, 1);
  }

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  getImageUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  clearImages() {
    this.selectedFiles = [];
  }

  confirmDate() {
    console.log("Fecha confirmada:", this.selectedDate);
  }

  onDateChange(event: any) {
    this.selectedDate = event.target.value;
  }

  handleKeyDown(event: KeyboardEvent) {
    event.preventDefault();
  }
}
