import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { unidadmedida } from 'src/app/models/unidadmedida.interface';

@Component({
  selector: 'app-modal-agregar-unidad',
  templateUrl: './modal-agregar-unidad.component.html',
  styleUrls: ['./modal-agregar-unidad.component.css']
})
export class ModalAgregarUnidadComponent implements OnInit {
  unidad: unidadmedida = { id: undefined, nombre: '' }; // Datos vacíos iniciales para el formulario

  constructor(
    public dialogRef: MatDialogRef<ModalAgregarUnidadComponent>
  ) {}

  ngOnInit(): void {}

  cerrarModal(): void {
    this.dialogRef.close();
  }

  agregarUnidad(): void {
    // Aquí podrías agregar la lógica para enviar los datos a tu servicio o backend
    this.dialogRef.close(this.unidad); // Cierra el modal y devuelve la nueva unidad
  }
}

