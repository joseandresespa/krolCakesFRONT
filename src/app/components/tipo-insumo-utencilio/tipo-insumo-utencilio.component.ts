import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component';
import { tipoinsumoutensilio } from 'src/app/models/tipoinsumoutensilio.interface';
import { CatalogosService } from 'src/services/catalogos.service';

@Component({
  selector: 'app-tipo-insumo-utencilio',
  templateUrl: './tipo-insumo-utencilio.component.html',
  styleUrls: ['./tipo-insumo-utencilio.component.css']
})
export class TipoInsumoUtencilioComponent implements OnInit {
  displayedColumns: string[] = ['id', 'tipo', 'acciones'];

  // Se inicializa el array con un dato de prueba
  tiposInsumoUtencilio: tipoinsumoutensilio[] = []; 

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: tipoinsumoutensilio[] = [];

  searchQuery: string = ''; // Para el buscador
  sortDirection: 'asc' | 'desc' = 'asc'; // Dirección de ordenamiento

  constructor(public dialog: MatDialog, private service: CatalogosService) { }

  ngOnInit(): void {
    this.service.tipoInsumoUtensilio().subscribe((datos: tipoinsumoutensilio[]) => {
      this.tiposInsumoUtencilio = datos;
      this.updatePagination();
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredAndSortedProducts().length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.filteredAndSortedProducts().slice(startIndex, endIndex);
  }

  // Filtrado por búsqueda y ordenamiento
  filteredAndSortedProducts(): tipoinsumoutensilio[] {
    return this.tiposInsumoUtencilio
      .filter(tipo => 
        tipo.tipo?.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const tipoA = a.tipo || ''; // Usar un string vacío si es undefined
        const tipoB = b.tipo || ''; // Usar un string vacío si es undefined
        const comparison = tipoA.localeCompare(tipoB);
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

  eliminarTipoInsumoUtencilio(tipoInsumoUtencilio: tipoinsumoutensilio): void {
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
        this.service.nuevoTipoInsumoUtensilio(result).subscribe(response => {
          const nuevo: tipoinsumoutensilio = {
            id: this.tiposInsumoUtencilio.length + 1,
            tipo: result.tipo
          };
          this.tiposInsumoUtencilio.push(nuevo);
          this.updatePagination();
        });
        setTimeout(() => {
          window.location.reload();
        }, 800);
      }
    });
  }

  // EDITAR
  editarTipoInsumoUtencilio(tipoInsumoUtencilio: tipoinsumoutensilio): void {
    const dialogRef = this.dialog.open(ModalEditarComponent, {
      width: '400px',
      data: {
        titulo: 'Editar Tipo de Insumo o Utensilio',
        campos: ['tipo'],
        valores: {
          tipo: tipoInsumoUtencilio.tipo
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const editado = this.tiposInsumoUtencilio.find(r => r.id === tipoInsumoUtencilio.id);
        if (editado) {
          editado.tipo = result.tipo;
          this.updatePagination();
        }
        this.service.ActualizarTipoInsumoUtensilio(editado).subscribe(response => {
          const editado = this.tiposInsumoUtencilio.find(p => p.id === tipoInsumoUtencilio.id);
          if (editado) {
            editado.tipo = result.tipo;
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


