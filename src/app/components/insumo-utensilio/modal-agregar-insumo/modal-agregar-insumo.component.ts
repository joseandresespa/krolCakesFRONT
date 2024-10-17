import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-agregar-insumo',
  templateUrl: './modal-agregar-insumo.component.html',
  styleUrls: ['./modal-agregar-insumo.component.css']
})
export class ModalAgregarInsumoComponent {
  tiposInsumo = []; // Array vacio
  unidadesMedida = []; // Array vacio

  selectedTipoInsumo: string | undefined; 
  selectedUnidadMedida: string | undefined; 

  constructor(public dialogRef: MatDialogRef<ModalAgregarInsumoComponent>) {}

  
  close(): void {
    this.dialogRef.close();
  }

  //  guardar el insumo
  saveInsumo(): void {
    console.log('Insumo guardado');
    console.log('Tipo de Insumo:', this.selectedTipoInsumo);
    console.log('Unidad de Medida:', this.selectedUnidadMedida);
    this.dialogRef.close(); 
  }
}

