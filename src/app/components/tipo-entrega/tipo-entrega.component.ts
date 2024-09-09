import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';

export interface TipoEntrega {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-tipo-entrega',
  templateUrl: './tipo-entrega.component.html',
  styleUrls: ['./tipo-entrega.component.css']
})
export class TipoEntregaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];


 // Se inicializa el array para que quede vacio
  tiposEntrega: TipoEntrega[] = []; 

  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: TipoEntrega[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.tiposEntrega.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.tiposEntrega.slice(startIndex, endIndex);
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

  eliminarTipoEntrega(tipoEntrega: TipoEntrega): void {
    console.log('Tipo de entrega eliminado:', tipoEntrega);
    this.tiposEntrega = this.tiposEntrega.filter(t => t.id !== tipoEntrega.id);
    this.updatePagination();
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '400px',
      data: {
        titulo: 'Agregar Tipo de Entrega',
        campos: ['nombre']
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tiposEntrega.push(result);
        this.updatePagination();
      }
    });
  }
}
