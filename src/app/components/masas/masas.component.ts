import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component'; // importar el componente de edición

export interface Masa {
  id: number;
  sabor: string;
}

@Component({
  selector: 'app-masas',
  templateUrl: './masas.component.html',
  styleUrls: ['./masas.component.css']
})
export class MasasComponent implements OnInit {
  displayedColumns: string[] = ['id', 'sabor', 'acciones'];

  // Se inicializa el array para que quede vacio
  masas: Masa[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: Masa[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.masas.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.masas.slice(startIndex, endIndex);
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

  eliminarMasa(masa: Masa): void {
    console.log('Masa eliminada:', masa);
    this.masas = this.masas.filter(m => m.id !== masa.id);
    this.updatePagination();
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '400px',
      data: {
        titulo: 'Agregar Masa',
        campos: ['sabor']
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.masas.push(result);
        this.updatePagination();
      }
    });
  }

  abrirModalEditar(masa: Masa): void {
    const dialogRef = this.dialog.open(ModalEditarComponent, {
      width: '400px',
      data: {
        titulo: 'Editar Masa',
        campos: ['sabor'],
        valores: { sabor: masa.sabor } // Precargar el valor actual de la masa
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.masas.findIndex(m => m.id === masa.id);
        if (index !== -1) {
          this.masas[index] = { ...this.masas[index], ...result };
          this.updatePagination();
        }
      }
    });
  }
}
