import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { cotizaciononline } from 'src/app/models/cotizaciononline.interface';

@Component({
  selector: 'app-modal-cotizacion',
  templateUrl: './modal-cotizacion.component.html',
  styleUrls: ['./modal-cotizacion.component.css']
})
export class ModalCotizacionComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalCotizacionComponent>,
    @Inject(MAT_DIALOG_DATA) public cotizacion: cotizaciononline
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
