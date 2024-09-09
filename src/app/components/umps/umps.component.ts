import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';

export interface Umps {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-umps',
  templateUrl: './umps.component.html',
  styleUrls: ['./umps.component.css']
})
export class UmpsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];

 // Se inicializa el array para que quede vacio
 umps: Umps[] = []; 

  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: Umps[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.umps.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.umps.slice(startIndex, endIndex);
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

  eliminarUmps(umps: Umps): void {
    console.log('UMPS eliminado:', umps);
    this.umps = this.umps.filter(u => u.id !== umps.id);
    this.updatePagination();
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '400px',
      data: {
        titulo: 'Agregar Unidad de Medida',
        campos: ['nombre']
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newId = this.umps.length ? Math.max(...this.umps.map(u => u.id)) + 1 : 1; // Generar nuevo ID
        this.umps.push({ id: newId, nombre: result.nombre });
        this.updatePagination();
      }
    });
  }
}
