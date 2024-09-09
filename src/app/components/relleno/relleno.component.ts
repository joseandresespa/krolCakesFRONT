import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';

export interface Relleno {
  id: number;
  sabor: string;
}

@Component({
  selector: 'app-relleno',
  templateUrl: './relleno.component.html',
  styleUrls: ['./relleno.component.css']
})
export class RellenoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'sabor', 'acciones'];
  
   // Se inicializa el array para que quede vacio
  rellenos: Relleno[] = []; 

  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: Relleno[] = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.rellenos.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.rellenos.slice(startIndex, endIndex);
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

  eliminarRelleno(relleno: Relleno): void {
    console.log('Relleno eliminado:', relleno);
    this.rellenos = this.rellenos.filter(r => r.id !== relleno.id);
    this.updatePagination();
  }

  openModal(): void {
    this.dialog.open(ModalGenericoComponent, {
      width: '400px',
      data: {
        titulo: 'Agregar Relleno',
        campos: ['sabor']
      }
    });
  }
}
