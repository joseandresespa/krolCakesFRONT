import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-editar-insumo',
  templateUrl: './modal-editar-insumo.component.html',
  styleUrls: ['./modal-editar-insumo.component.css']
})
export class ModalEditarInsumoComponent {
  tiposInsumo = []; // Array vacio
  unidadesMedida = []; // Array vacio

  constructor(
    public dialogRef: MatDialogRef<ModalEditarInsumoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Recibe los datos del insumo a editar
  ) {}

  // Método para cerrar el modal
  close(): void {
    this.dialogRef.close();
  }

  // Método para guardar el insumo
  saveInsumo(): void {
    console.log('Insumo editado:', this.data);
    this.dialogRef.close(); // Cierra el modal después de guardar
  }
}

