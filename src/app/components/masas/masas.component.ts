import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';
import { masa } from 'src/app/models/masa.interface';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component';
import { CatalogosService } from 'src/services/catalogos.service';

@Component({
  selector: 'app-masas',
  templateUrl: './masas.component.html',
  styleUrls: ['./masas.component.css']
})
export class MasasComponent implements OnInit {
  displayedColumns: string[] = ['id', 'sabor_masa', 'acciones'];
  masas: masa[] = [];
  dataSource: masa[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  pages: number[] = [];
  searchQuery: string = ''; // Para la búsqueda
  sortDirection: 'asc' | 'desc' = 'asc'; // Para la ordenación

  constructor(public dialog: MatDialog, private service: CatalogosService) { }

  ngOnInit(): void {
    this.service.masas().subscribe((datos: masa[]) => {
      this.masas = datos;
      this.updatePagination();
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.masas.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const filteredMasas = this.filteredAndSortedData();

    // Paginación
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = filteredMasas.slice(startIndex, endIndex);
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
  filteredAndSortedData(): masa[] {
    return this.masas
      .filter(masa => masa.sabor_masa && masa.sabor_masa.toLowerCase().includes(this.searchQuery.toLowerCase())) // Filtrado por búsqueda
      .sort((a, b) => {
        const saborA = a.sabor_masa || ''; // Usar un string vacío si es undefined
        const saborB = b.sabor_masa || ''; // Usar un string vacío si es undefined
        const comparison = saborA.localeCompare(saborB);
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
  }

  onSearchChange(): void {
    this.currentPage = 1; // Reiniciar a la primera página al buscar
    this.paginate();
  }

  toggleSortDirection(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.paginate();
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '400px',
      data: { titulo: 'Agregar Masa', campos: ['sabor_masa'] }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.nuevaMasa(result).subscribe(response => {
          const nuevo: masa = { id: this.masas.length + 1, sabor_masa: result.sabor_masa };
          this.masas.push(nuevo);
          this.updatePagination();
        });
        setTimeout(() => {
          
        }, 800);
      }
    });
  }

  abrirModalEditar(masa: masa): void {
    const dialogRef = this.dialog.open(ModalEditarComponent, {
      width: '400px',
      data: {
        titulo: 'Editar Masa',
        campos: ['sabor_masa'],
        valores: { sabor_masa: masa.sabor_masa }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const editado = this.masas.find(r => r.id === masa.id);
        if (editado) {
          editado.sabor_masa = result.sabor_masa;
          this.updatePagination();
          this.service.actualizarMasa(editado).subscribe(response => {
            this.updatePagination();
          });
        }
      }
    });
  }
}

