import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAgregarInsumoComponent } from './modal-agregar-insumo/modal-agregar-insumo.component';
import { ModalEditarInsumoComponent } from './modal-editar-insumo/modal-editar-insumo.component';
import { insumoutensilio } from 'src/app/models/insumoutensilio.interface';
import { CatalogosService } from 'src/services/catalogos.service';

@Component({
  selector: 'app-insumo-utensilio',
  templateUrl: './insumo-utensilio.component.html',
  styleUrls: ['./insumo-utensilio.component.css']
})
export class InsumoUtensilioComponent implements OnInit {

  insumosUtensilios: insumoutensilio[] = [];
  displayedColumns: string[] = ['id', 'tipo', 'nombre', 'nombre_unidad_medida', 'precio_unitario',
    'cantidad', 'inventarioRenovable', 'fecha_ing', 'fecha_ven', 'acciones'];

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: insumoutensilio[] = [];

  searchQuery: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(public dialog: MatDialog, private service: CatalogosService) {}

  ngOnInit(): void {
    this.service.insumos().subscribe((insumo: insumoutensilio[]) => {
      this.insumosUtensilios = insumo;
      this.updatePagination();
      console.log(this.insumosUtensilios);
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
  filteredAndSortedData(): insumoutensilio[] {
    return this.insumosUtensilios
      .filter(insumo => 
        insumo.nombre && insumo.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())) // Filtrado por búsqueda
      .sort((a, b) => {
        const nameA = a.nombre || ''; // Usar un string vacío si es undefined
        const nameB = b.nombre || ''; // Usar un string vacío si es undefined
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
    this.paginate();
  }

  openAddModal() {
    const dialogRef = this.dialog.open(ModalAgregarInsumoComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.nuevoInsumo(result).subscribe(response => {
          this.insumosUtensilios.push(response); // Actualiza la lista de insumos con la respuesta
          this.updatePagination(); // Actualiza la paginación
        });
        setTimeout(() => {
          
        }, 800);
      }
    });
  }

  openEditModal(insumo: insumoutensilio) {
    const dialogRef = this.dialog.open(ModalEditarInsumoComponent, {
      width: '400px',
      data: { ...insumo }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.Actualizarinsumo(result).subscribe(response => {
          const index = this.insumosUtensilios.findIndex(i => i.id === result.id);
          if (index !== -1) {
            this.insumosUtensilios[index] = result; // Actualiza el insumo editado
            this.updatePagination(); // Actualiza la paginación
          }
        });
      }
    });
  }
}
