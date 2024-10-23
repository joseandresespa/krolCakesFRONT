import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component'; 
import { relleno } from 'src/app/models/relleno.interface';
import { CatalogosService } from 'src/services/catalogos.service';

@Component({
  selector: 'app-relleno',
  templateUrl: './relleno.component.html',
  styleUrls: ['./relleno.component.css']
})
export class RellenoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'sabor_relleno', 'acciones'];
  rellenos: relleno[] = []; 
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: relleno[] = [];
  searchQuery: string = ''; // Variable para el buscador
  sortDirection: 'asc' | 'desc' = 'asc'; // Dirección de ordenamiento

  constructor(public dialog: MatDialog, private service: CatalogosService) { }

  ngOnInit(): void {
    this.service.rellenos().subscribe((datos: relleno[]) => {
      this.rellenos = datos;
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
  filteredAndSortedData(): relleno[] {
    return this.rellenos
      .filter(relleno => relleno.sabor_relleno && relleno.sabor_relleno.toLowerCase().includes(this.searchQuery.toLowerCase())) // Filtrado por búsqueda
      .sort((a, b) => {
        const nameA = a.sabor_relleno || ''; // Usar un string vacío si es undefined
        const nameB = b.sabor_relleno || ''; // Usar un string vacío si es undefined
        const comparison = nameA.localeCompare(nameB);
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
  }

  // Manejar cambio de búsqueda
  onSearchQueryChange(query: string): void {
    this.searchQuery = query;
    this.updatePagination();
  }

  // Alternar dirección de orden
  toggleSortDirection(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.paginate();
  }

  eliminarRelleno(relleno: relleno): void {
    console.log('Relleno eliminado:', relleno);
    this.rellenos = this.rellenos.filter(r => r.id !== relleno.id);
    this.updatePagination();
  }

  abrirModalAgregar(): void {
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '400px',
      data: {
        titulo: 'Agregar Relleno',
        campos: ['sabor_relleno']
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.nuevoRelleno(result).subscribe(response => {
          const nuevo: relleno = {
            id: this.rellenos.length + 1,
            sabor_relleno: result.sabor_relleno
          };
          this.rellenos.push(nuevo);
          this.updatePagination();
        });
      }
    });
  }

  abrirModalEdicion(relleno: relleno): void {
    const dialogRef = this.dialog.open(ModalEditarComponent, {
      width: '400px',
      data: {
        titulo: 'Editar Relleno',
        campos: ['sabor_relleno'],
        valores: { sabor_relleno: relleno.sabor_relleno }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const editado = this.rellenos.find(r => r.id === relleno.id);
        if (editado) {
          editado.sabor_relleno = result.sabor_relleno;
          this.updatePagination();
        }
        this.service.actualizarRelleno(editado).subscribe(response => {
          const editado = this.rellenos.find(p => p.id === relleno.id);
          if (editado) {
            editado.sabor_relleno = result.sabor_relleno;
            this.updatePagination();
          }
        });
      }
    });
  }
}
