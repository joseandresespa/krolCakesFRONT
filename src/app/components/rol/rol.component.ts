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
  roles: rol[] = []; // Aquí deberías tener tus datos de roles
  currentPage: number = 1; // Página actual
  itemsPerPage: number = 5; // Cantidad de items por página
  totalItems: number = 0; // Total de items para calcular la paginación

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    // Aquí deberías cargar los roles y asignar totalItems
    this.totalItems = this.roles.length; // Suponiendo que roles se llena al cargar
  }

  abrirModalAgregar() {
    this.dialog.open(ModalAgregarRolComponent);
  }

  abrirModalEditar(rol: rol) {
    this.dialog.open(ModalEditarRolComponent, {
      data: { rol }
    });
  }

  // Método para cambiar la página
  changePage(page: number) {
    this.currentPage = page;
  }

  // Método para obtener los roles de la página actual
  get paginatedRoles(): rol[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.roles.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Método para calcular el número total de páginas
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
}

