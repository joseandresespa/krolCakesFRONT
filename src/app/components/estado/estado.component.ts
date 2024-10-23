import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { estado } from 'src/app/models/estado.interface';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component'; 
import { CatalogosService } from 'src/services/catalogos.service';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'estado', 'acciones'];
  estados: estado[] = [];
  dataSource: estado[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  pages: number[] = [];

  searchQuery: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(public dialog: MatDialog, private service: CatalogosService) { }

  ngOnInit(): void {
    this.service.estado().subscribe((datos: estado[]) => {
      this.estados = datos;
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

  // Filtrado por búsqueda y orden
  filteredAndSortedData(): estado[] {
    return this.estados
      .filter(estado => estado.estado && estado.estado.toLowerCase().includes(this.searchQuery.toLowerCase())) // Filtrado por búsqueda
      .sort((a, b) => {
        const nameA = a.estado || ''; // Usar un string vacío si es undefined
        const nameB = b.estado || ''; // Usar un string vacío si es undefined
        const comparison = nameA.localeCompare(nameB);
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
  }

  onSearchQueryChange(query: string): void {
    this.searchQuery = query;
    this.updatePagination(); // Actualizar la paginación al cambiar la búsqueda
  }

  toggleSortDirection(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.paginate();
  }

  // Abrir modal de agregar
  agregarEstado(): void {
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '400px',
      data: {
        titulo: 'Agregar estado',
        campos: ['estado']
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.nuevoEstado(result).subscribe(response => {
          const nuevo: estado = {
            id: this.estados.length + 1,
            estado: result.estado
          };
          this.estados.push(nuevo);
          this.updatePagination(); // Actualizar paginación después de agregar
        });
      }
    });
  }

  // Abrir modal de editar
  editarEstado(estado: estado): void {
    const dialogRef = this.dialog.open(ModalEditarComponent, {
      width: '400px',
      data: {
        titulo: 'Editar Estado',
        campos: ['estado'],
        valores: { estado: estado.estado } 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const editado = this.estados.find(r => r.id === estado.id);
        if (editado) {
          editado.estado = result.estado;
          this.service.actualizarEstado(editado).subscribe();
          this.updatePagination(); // Actualizar paginación después de editar
        }
      }
    });
  }
}

