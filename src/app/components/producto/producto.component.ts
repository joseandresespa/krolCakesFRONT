import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';
import { producto } from 'src/app/models/producto.interface';
import { CatalogosService } from 'src/services/catalogos.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'precio_online', 'acciones'];

  productos: producto[] = [];
  dataSource: producto[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  pages: number[] = [];
  
  searchQuery: string = ''; // Para el buscador
  sortDirection: 'asc' | 'desc' = 'asc'; // Dirección de ordenamiento

  constructor(private dialog: MatDialog, private service: CatalogosService) { }

  ngOnInit(): void {
    this.service.productos().subscribe((productos: producto[]) => {
      this.productos = productos;
      this.updatePagination();
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.productos.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const filteredProducts = this.filteredAndSortedProducts();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = filteredProducts.slice(startIndex, endIndex);
  }

  // Filtrado por búsqueda
  filteredAndSortedProducts(): producto[] {
    return this.productos
      .filter(producto => 
        producto.nombre?.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const nameA = a.nombre || ''; // Usar un string vacío si es undefined
        const nameB = b.nombre || ''; // Usar un string vacío si es undefined
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

  eliminarProducto(producto: producto): void {
    this.productos = this.productos.filter(p => p.id !== producto.id);
    this.updatePagination();
  }

  editarProducto(producto: producto): void {
    const dialogRef = this.dialog.open(ModalEditarComponent, {
      data: {
        titulo: 'Editar Producto',
        campos: ['nombre', 'descripcion', 'precio_online'],
        valores: {
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio_online: producto.precio_online
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const productoActualizado = {
          id: producto.id,
          nombre: result.nombre,
          descripcion: result.descripcion,
          precio_online: result.precio_online
        };
        
        this.service.actualizarProducto(productoActualizado).subscribe(() => {
          const productoEditado = this.productos.find(p => p.id === producto.id);
          if (productoEditado) {
            Object.assign(productoEditado, result);
            this.updatePagination();
          }
        });
      }
    });
  }

  openModal(): void {
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      data: {
        titulo: 'Agregar Producto',
        campos: ['nombre', 'descripcion', 'precio_online']
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.nuevoProducto(result).subscribe(response => {
          const newProducto: producto = {
            id: response.id,
            nombre: response.nombre,
            descripcion: response.descripcion,
            precio_online: response.precio_online
          };
          this.productos.push(newProducto);
          this.updatePagination();
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


