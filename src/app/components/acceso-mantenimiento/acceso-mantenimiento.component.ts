import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { acceso } from 'src/app/models/acceso.interface'; 
import { ModalAgregarAccesoComponent } from './modal-agregar-acceso/modal-agregar-acceso.component';
import { ModalEditarAccesoComponent } from './modal-editar-acceso/modal-editar-acceso.component';

@Component({
  selector: 'app-acceso-mantenimiento',
  templateUrl: './acceso-mantenimiento.component.html',
  styleUrls: ['./acceso-mantenimiento.component.css']
})
export class AccesoMantenimientoComponent implements OnInit {
  displayedColumns: string[] = ['correlativo', 'id_rol', 'id_modulo', 'acciones'];

  accesos: acceso[] = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  abrirModalAgregar() {
    this.dialog.open(ModalAgregarAccesoComponent);
  }

  abrirModalEditar(acceso: acceso) {
    this.dialog.open(ModalEditarAccesoComponent, {
      data: { acceso }  
    });
  }
}
