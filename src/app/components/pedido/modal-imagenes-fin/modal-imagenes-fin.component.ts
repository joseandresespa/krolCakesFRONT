import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { pedido } from 'src/app/models/pedido.interface'; 

@Component({
  selector: 'app-modal-imagenes-fin',
  templateUrl: './modal-imagenes-fin.component.html',
  styleUrls: ['./modal-imagenes-fin.component.css']
})
export class ModalImagenesFinComponent{

  constructor(
    public dialogRef: MatDialogRef<ModalImagenesFinComponent>,
    @Inject(MAT_DIALOG_DATA) public data: pedido
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
