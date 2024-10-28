import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { pedido } from 'src/app/models/pedido.interface'; 

@Component({
  selector: 'app-modal-desgloce-costo',
  templateUrl: './modal-desgloce-costo.component.html',
  styleUrls: ['./modal-desgloce-costo.component.css']
})
export class ModalDesgloceCostoComponent  {

  constructor(
    public dialogRef: MatDialogRef<ModalDesgloceCostoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: pedido
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
