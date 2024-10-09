import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAgregarRolComponent } from './modal-agregar-rol/modal-agregar-rol.component';
import { ModalEditarRolComponent } from './modal-editar-rol/modal-editar-rol.component';
import { rol } from 'src/app/models/rol.interface';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];

  roles: rol[] = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  abrirModalAgregar() {
    this.dialog.open(ModalAgregarRolComponent);
  }

  abrirModalEditar(rol: rol) {
    this.dialog.open(ModalEditarRolComponent, {
      data: { rol }
    });
  }
}

