import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { unidadmedida } from 'src/app/models/unidadmedida.interface'; // Asegúrate de que esté importado

@Component({
  selector: 'app-modaleditar-unidad',
  templateUrl: './modaleditar-unidad.component.html',
  styleUrls: ['./modaleditar-unidad.component.css']
})
export class ModaleditarUnidadComponent implements OnInit {
  unidad: unidadmedida; 

  constructor(
    public dialogRef: MatDialogRef<ModaleditarUnidadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: unidadmedida 
  ) {
    this.unidad = data; 
    
  }

  ngOnInit(): void { }

  cerrarModal(): void {
    this.dialogRef.close();
  }
}