import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component';
import { tipoevento } from 'src/app/models/tipoevento.interface';
import { CatalogosService } from 'src/services/catalogos.service';

@Component({
  selector: 'app-tipo-evento',
  templateUrl: './tipo-evento.component.html',
  styleUrls: ['./tipo-evento.component.css']
})
export class TipoEventoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];

  // Array de tipos de evento
  tiposEvento: tipoevento[] = [];

  // Parámetros de paginación
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: tipoevento[] = [];

  // Parámetros de búsqueda y ordenamiento
  searchQuery: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(public dialog: MatDialog, private service: CatalogosService) {}

  ngOnInit(): void {
    this.service.tipoEvento().subscribe((eventos: tipoevento[]) => {
      this.tiposEvento = eventos;
      this.updatePagination();
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredAndSortedData().length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.filteredAndSortedData().slice(startIndex, endIndex);
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

  // Filtrado y ordenamiento
  filteredAndSortedData(): tipoevento[] {
    return this.tiposEvento
      .filter(tipo => tipo.nombre && tipo.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())) // Filtrar por búsqueda
      .sort((a, b) => {
        const nameA = a.nombre || ''; // Asegurarse de que no sea undefined
        const nameB = b.nombre || '';
        const comparison = nameA.localeCompare(nameB);
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
  }

  onSearchQueryChange(query: string): void {
    this.searchQuery = query;
    this.updatePagination();
  }

  toggleSortDirection(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.updatePagination();
  }

  // Eliminar tipo de evento
  eliminarTipoEvento(tipoEvento: tipoevento): void {
    console.log('Tipo de evento eliminado:', tipoEvento);
    this.tiposEvento = this.tiposEvento.filter(t => t.id !== tipoEvento.id);
    this.updatePagination();
  }

  // Abrir modal para agregar nuevo tipo de evento
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
        this.service.nuevoTipoEvento(result).subscribe(response => {
          const nuevo: tipoevento = {
            id: this.tiposEvento.length + 1,
            nombre: result.nombre
          };
          this.tiposEvento.push(nuevo);
          
        });
        setTimeout(() => {
          window.location.reload();
        }, 800);
      }
    });
  }

  // Editar tipo de evento
  editarTipoEvento(tipoEvento: tipoevento): void {
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
        const editado = this.tiposEvento.find(r => r.id === tipoEvento.id);
        if (editado) {
          editado.nombre = result.nombre;
          this.updatePagination();
        }
        this.service.ActualizarTipoEvento(editado).subscribe();
      }
    });
  }
}
