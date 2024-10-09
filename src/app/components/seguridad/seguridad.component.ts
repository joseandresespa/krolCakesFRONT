import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAgregarComponent } from './modal-agregar/modal-agregar.component';
import { ModalEditarSeguridadComponent } from './modal-editar-seguridad/modal-editar-seguridad.component';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html',
  styleUrls: ['./seguridad.component.css']
})
export class SeguridadComponent {
  roles = [];

  constructor(public dialog: MatDialog) { }

  abrirModalAgregar() {
    this.dialog.open(ModalAgregarComponent);
  }

  abrirModalEditar() {
    this.dialog.open(ModalEditarSeguridadComponent);
  }
}
