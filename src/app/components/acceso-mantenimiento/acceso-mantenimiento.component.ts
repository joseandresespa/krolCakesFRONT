import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { acceso } from 'src/app/models/acceso.interface'; 
import { ModalAgregarAccesoComponent } from './modal-agregar-acceso/modal-agregar-acceso.component';
import { ModalEditarAccesoComponent } from './modal-editar-acceso/modal-editar-acceso.component';

@Component({
  selector: 'app-acceso-mantenimiento',
  templateUrl: './acceso-mantenimiento.component.html',
  styleUrls: ['./acceso-mantenimiento.component.css']
})
export class AccesoMantenimientoComponent implements OnInit {
  displayedColumns: string[] = ['correlativo', 'id_rol', 'id_modulo', 'acciones'];

  accesos: acceso[] = [];
  searchQuery: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  dataSource: acceso[] = [];

  // Paginación
  currentPage: number = 1; // Página actual
  itemsPerPage: number = 5; // Cantidad de items por página
  totalItems: number = 0; // Total de items

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    // Aquí puedes cargar tus accesos desde un servicio
    // this.accesos = await this.loadAccesos(); // Ejemplo
    this.totalItems = this.accesos.length; // Suponiendo que accesos se llena al cargar
    this.dataSource = this.filteredAndSortedData(); // Inicializar dataSource
  }

  filteredAndSortedData(): acceso[] {
    return this.accesos
      .filter(acceso => acceso.id_rol && acceso.id_rol.toString().includes(this.searchQuery) ||
                       acceso.correlativo && acceso.correlativo.toString().includes(this.searchQuery) ||
                       acceso.id_modulo && acceso.id_modulo.toString().includes(this.searchQuery)) // Filtrado por búsqueda
      .sort((a, b) => {
        const correlativoA = a.correlativo || 0; // Usar 0 si es undefined
        const correlativoB = b.correlativo || 0; // Usar 0 si es undefined
        const comparison = correlativoA - correlativoB; // Ordenar por correlativo
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
  }

  onSearchQueryChange(query: string): void {
    this.searchQuery = query;
    this.dataSource = this.filteredAndSortedData(); // Actualizar dataSource
    this.totalItems = this.dataSource.length; // Actualizar totalItems después del filtrado
  }

  toggleSortDirection(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.dataSource = this.filteredAndSortedData(); // Actualizar dataSource
  }

  // Método para cambiar la página
  changePage(page: number) {
    this.currentPage = page;
  }

  // Método para obtener los accesos de la página actual
  get paginatedAccesos(): acceso[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.dataSource.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Método para calcular el número total de páginas
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  abrirModalAgregar() {
    this.dialog.open(ModalAgregarAccesoComponent);
  }

  abrirModalEditar(acceso: acceso) {
    this.dialog.open(ModalEditarAccesoComponent, {
      data: { acceso }  
    });
  }
}

