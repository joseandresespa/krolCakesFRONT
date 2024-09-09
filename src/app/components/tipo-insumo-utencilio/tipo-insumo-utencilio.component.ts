import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';

export interface TipoInsumoUtencilio {
  id: number;
  tipo: string;
}

@Component({
  selector: 'app-tipo-insumo-utencilio',
  templateUrl: './tipo-insumo-utencilio.component.html',
  styleUrls: ['./tipo-insumo-utencilio.component.css']
})
export class TipoInsumoUtencilioComponent implements OnInit {
  displayedColumns: string[] = ['id', 'tipo', 'acciones'];
  
 // Se inicializa el array para que quede vacio
 tiposInsumoUtencilio: TipoInsumoUtencilio[] = []; 

  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: TipoInsumoUtencilio[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.tiposInsumoUtencilio.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.tiposInsumoUtencilio.slice(startIndex, endIndex);
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

  eliminarTipoInsumoUtencilio(tipoInsumoUtencilio: TipoInsumoUtencilio): void {
    console.log('Tipo de insumo o utensilio eliminado:', tipoInsumoUtencilio);
    this.tiposInsumoUtencilio = this.tiposInsumoUtencilio.filter(t => t.id !== tipoInsumoUtencilio.id);
    this.updatePagination();
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '400px',
      data: {
        titulo: 'Agregar Tipo de Insumo o Utensilio',
        campos: ['tipo']
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newId = this.tiposInsumoUtencilio.length ? Math.max(...this.tiposInsumoUtencilio.map(t => t.id)) + 1 : 1; // Generar nuevo ID
        this.tiposInsumoUtencilio.push({ id: newId, ...result });
        this.updatePagination();
      }
    });
  }
}
