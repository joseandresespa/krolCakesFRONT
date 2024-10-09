import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { estado } from 'src/app/models/estado.interface';

@Component({
  selector: 'app-modal-editar-estado',
  templateUrl: './modal-editar-estado.component.html',
  styleUrls: ['./modal-editar-estado.component.css']
})
export class ModalEditarEstadoComponent implements OnInit {

  estado: estado; // Datos del estado a editar

  constructor(
    public dialogRef: MatDialogRef<ModalEditarEstadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: estado // Datos precargados
  ) {
    this.estado = data; // Asignamos los datos al objeto estado
  }

  ngOnInit(): void {}

  cerrarModal(): void {
    this.dialogRef.close();
  }
}
