import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { cotizaciononline } from 'src/app/models/cotizaciononline.interface';


@Component({
  selector: 'app-modal-confirmar',
  templateUrl: './modal-confirmar.component.html',
  styleUrls: ['./modal-confirmar.component.css']
})
export class ModalConfirmarComponent{

  constructor(
    public dialogRef: MatDialogRef<ModalConfirmarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    //  lógica de confirmación
    this.dialogRef.close(this.data); // Devuelve los datos actualizados al componente que lo abrió
  }
}