import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { estado } from 'src/app/models/estado.interface';

@Component({
  selector: 'app-modal-agregar-estado',
  templateUrl: './modal-agregar-estado.component.html',
  styleUrls: ['./modal-agregar-estado.component.css']
})
export class ModalAgregarEstadoComponent implements OnInit {

  nuevoEstado: estado = { estado: '' }; // Datos vacíos para pintar el formulario

  constructor(public dialogRef: MatDialogRef<ModalAgregarEstadoComponent>) { }

  ngOnInit(): void { }

  cerrarModal(): void {
    this.dialogRef.close();
  }
}