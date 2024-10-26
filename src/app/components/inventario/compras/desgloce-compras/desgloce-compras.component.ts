import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { comprainventario } from 'src/app/models/comprainventario.interface';
import { ingresoinventario } from 'src/app/models/ingresoinventario.interface';

@Component({
  selector: 'app-desgloce-compras',
  templateUrl: './desgloce-compras.component.html',
  styleUrls: ['./desgloce-compras.component.css']
})
export class DesgloceComprasComponent {
  detalleCompra: ingresoinventario[] = []; // Inicializa como arreglo vacío
  dialogRef: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: comprainventario) {
    // Asegúrate de que detalleCompra sea un arreglo
    this.detalleCompra = data.detalleCompra || [];
  }

  ngOnInit(): void {

  }
  
}
