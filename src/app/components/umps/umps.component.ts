import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component';
import { unidadmedidapreciosugerido } from 'src/app/models/unidadmedidapreciosugerido.interface';
import { CatalogosService } from 'src/services/catalogos.service';

@Component({
  selector: 'app-umps',
  templateUrl: './umps.component.html',
  styleUrls: ['./umps.component.css']
})
export class UmpsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];

  umps: unidadmedidapreciosugerido[] = []; 
  dataSource: unidadmedidapreciosugerido[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  pages: number[] = [];
  
  searchQuery: string = ''; // Para el buscador
  sortDirection: 'asc' | 'desc' = 'asc'; // Dirección de ordenamiento

  constructor(private dialog: MatDialog, private service: CatalogosService) { }

  ngOnInit(): void {
    this.service.unidadesInventario().subscribe((unidadesPS: unidadmedidapreciosugerido[]) => {
      this.umps = unidadesPS;
      this.updatePagination();
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredAndSortedUmps().length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const filteredUmps = this.filteredAndSortedUmps();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = filteredUmps.slice(startIndex, endIndex);
  }

  // Filtrado por búsqueda
  filteredAndSortedUmps(): unidadmedidapreciosugerido[] {
    return this.umps
      .filter(umps => 
        umps.nombre?.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const nameA = a.nombre || '';
        const nameB = b.nombre || '';
        const comparison = nameA.localeCompare(nameB);
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
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

  eliminarUmps(umps: unidadmedidapreciosugerido): void {
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
        this.service.nuevaUnidadInventario(result).subscribe(response => {
          const newUmps: unidadmedidapreciosugerido = {
            id: response.id,
            nombre: response.nombre
          };
          this.umps.push(newUmps);
          this.updatePagination();
        });
        setTimeout(() => {
          window.location.reload();
        }, 800);
      }
    });
  }

  editarUmps(umps: unidadmedidapreciosugerido): void {
    const dialogRef = this.dialog.open(ModalEditarComponent, {
      width: '400px',
      data: {
        titulo: 'Editar Unidad de Medida',
        campos: ['nombre'],
        valores: {
          nombre: umps.nombre
        }
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const upmsActualizado = {
          id: umps.id,
          nombre: result.nombre
        };
        
        this.service.actualizarUnidadInventario(upmsActualizado).subscribe(response => {
          const umpsEditado = this.umps.find(p => p.id === umps.id);
          if (umpsEditado) {
            umpsEditado.nombre = result.nombre;
            this.updatePagination();
          }
        });

      }
    });
  }

  // Métodos para cambiar la dirección de ordenamiento
  toggleSortDirection(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.paginate();
  }
}
