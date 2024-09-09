import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';

export interface Cliente {
  id: number;
  nombre: string;
  telefono: string;
  nit: string;
}

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'telefono', 'nit', 'acciones'];

  // Se inicializa el array para que quede vacio
  clientes: Cliente[] = []; 

  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: Cliente[] = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.clientes.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.clientes.slice(startIndex, endIndex);
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

  eliminarCliente(cliente: Cliente): void {
    console.log('Cliente eliminado:', cliente);
    this.clientes = this.clientes.filter(c => c.id !== cliente.id);
    this.updatePagination();
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '400px',
      data: {
        titulo: 'Agregar Cliente',
        campos: ['nombre', 'telefono', 'nit']
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientes.push(result);
        this.updatePagination();
      }
    });
  }
}
