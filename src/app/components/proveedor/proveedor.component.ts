import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component';

export interface Proveedor {
  id: number;
  nombre: string;
  telefono: string;
  descripcion: string;
}

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'telefono', 'descripcion', 'acciones'];

  // Se inicializa el array con un dato de prueba
  proveedores: Proveedor[] = []; 

  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: Proveedor[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.proveedores.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.proveedores.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.paginate();
  }

  eliminarProveedor(proveedor: Proveedor): void {
    console.log('Proveedor eliminado:', proveedor);
    this.proveedores = this.proveedores.filter(p => p.id !== proveedor.id);
    this.updatePagination();
  }

  abrirModalAgregar(): void {
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '400px',
      data: { titulo: 'Agregar Proveedor', campos: ['Nombre', 'Teléfono', 'Descripción'] }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newId = this.proveedores.length ? Math.max(...this.proveedores.map(p => p.id)) + 1 : 1; // Generar nuevo ID
        this.proveedores.push({ id: newId, ...result });
        this.updatePagination();
      }
    });
  }
//EDITAR
  editarProveedor(proveedor: Proveedor): void {
    const dialogRef = this.dialog.open(ModalEditarComponent, {
      width: '400px',
      data: {
        titulo: 'Editar Proveedor',
        campos: ['nombre', 'telefono', 'descripcion'],
        valores: {
          nombre: proveedor.nombre,
          telefono: proveedor.telefono,
          descripcion: proveedor.descripcion
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const proveedorEditado = this.proveedores.find(p => p.id === proveedor.id);
        if (proveedorEditado) {
          Object.assign(proveedorEditado, result);
          this.updatePagination();
        }
      }
    });
  }
}
