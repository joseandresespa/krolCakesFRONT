import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precioOnline: number;
}

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'precioOnline', 'acciones'];
  
  // Array vacio
  productos: Producto[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: Producto[] = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.productos.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.productos.slice(startIndex, endIndex);
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

  eliminarProducto(producto: Producto): void {
    console.log('Producto eliminado:', producto);
    this.productos = this.productos.filter(p => p.id !== producto.id);
    this.updatePagination();
  }

  
// EDITAR
  editarProducto(producto: Producto): void {
    const dialogRef = this.dialog.open(ModalEditarComponent, {
      data: {
        titulo: 'Editar Producto',
        campos: ['nombre', 'descripcion', 'precioOnline'],
        valores: {
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precioOnline: producto.precioOnline
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const productoEditado = this.productos.find(p => p.id === producto.id);
        if (productoEditado) {
          productoEditado.nombre = result.nombre;
          productoEditado.descripcion = result.descripcion;
          productoEditado.precioOnline = result.precioOnline;
          this.updatePagination();
        }
      }
    });
  }

  openModal(): void {
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      data: {
        titulo: 'Agregar Producto',
        campos: ['nombre', 'descripcion', 'precioOnline']
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newProducto: Producto = {
          id: this.productos.length + 1,
          nombre: result.nombre,
          descripcion: result.descripcion,
          precioOnline: result.precioOnline
        };
        this.productos.push(newProducto);
        this.updatePagination();
      }
    });
  }
}
