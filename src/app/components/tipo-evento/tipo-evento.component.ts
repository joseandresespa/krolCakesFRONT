import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component';

export interface TipoEvento {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-tipo-evento',
  templateUrl: './tipo-evento.component.html',
  styleUrls: ['./tipo-evento.component.css']
})
export class TipoEventoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];

  // array vacio
  tiposEvento: TipoEvento[] = []; 

  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: TipoEvento[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.tiposEvento.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.tiposEvento.slice(startIndex, endIndex);
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

  eliminarTipoEvento(tipoEvento: TipoEvento): void {
    console.log('Tipo de evento eliminado:', tipoEvento);
    this.tiposEvento = this.tiposEvento.filter(t => t.id !== tipoEvento.id);
    this.updatePagination();
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '400px',
      data: {
        titulo: 'Agregar Tipo de Evento',
        campos: ['nombre']
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tiposEvento.push(result);
        this.updatePagination();
      }
    });
  }

  // EDITAR
  editarTipoEvento(tipoEvento: TipoEvento): void {
    const dialogRef = this.dialog.open(ModalEditarComponent, {
      width: '400px',
      data: {
        titulo: 'Editar Tipo de Evento',
        campos: ['nombre'],
        valores: {
          nombre: tipoEvento.nombre
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const tipoEventoEditado = this.tiposEvento.find(t => t.id === tipoEvento.id);
        if (tipoEventoEditado) {
          tipoEventoEditado.nombre = result.nombre;
          this.updatePagination();
        }
      }
    });
  }
}
