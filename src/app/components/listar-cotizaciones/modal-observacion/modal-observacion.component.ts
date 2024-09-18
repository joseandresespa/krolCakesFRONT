import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { cotizaciononline } from 'src/app/models/cotizaciononline.interface';

@Component({
  selector: 'app-modal-observacion',
  templateUrl: './modal-observacion.component.html',
  styleUrls: ['./modal-observacion.component.css']
})
export class ModalObservacionComponent{
  observacion: string = ''; // Inicializar la propiedad observacion
  constructor(
    public dialogRef: MatDialogRef<ModalObservacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmObservation() {
    // lógica al ejecutar el boton "confirmar" para la observacion 
    console.log('Observación confirmada:', this.observacion);
   
  }

}
