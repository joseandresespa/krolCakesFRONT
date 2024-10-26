import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { salidainventario, salidaInventarioDetalle } from 'src/app/models/salidainventario.interface'; 

@Component({
  selector: 'app-desglose-salida',
  templateUrl: './desglose-salida.component.html',
  styleUrls: ['./desglose-salida.component.css']
})
export class DesgloseSalidaComponent  {

  detalleSalida: salidaInventarioDetalle[] = []; 
  dialogRef: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: salidainventario) {
    this.detalleSalida = data.detalleSalida || [];
  }

  ngOnInit(): void {

  }
  
}

