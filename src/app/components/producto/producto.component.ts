import { Component, OnInit, Provider } from '@angular/core';
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
  
  // Array vacio
  productos: producto[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: producto[] = [];

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
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.productos.slice(startIndex, endIndex);
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
    console.log('Producto eliminado:', producto);
    this.productos = this.productos.filter(p => p.id !== producto.id);
    this.updatePagination();
  }

  
// EDITAR
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
        // Crear un objeto con los datos actualizados
        const productoActualizado = {
          id: producto.id, // Necesitas enviar el ID del producto para identificar cuál actualizar
          nombre: result.nombre,
          descripcion: result.descripcion,
          precio_online: result.precio_online
        };
        
        // Llamar al servicio para actualizar el producto en el backend
        this.service.actualizarProducto(productoActualizado).subscribe(response => {
          // Actualizar el producto en la lista local si es necesario
          const productoEditado = this.productos.find(p => p.id === producto.id);
          if (productoEditado) {
            productoEditado.nombre = result.nombre;
            productoEditado.descripcion = result.descripcion;
            productoEditado.precio_online = result.precio_online;
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
        // Llamada al servicio para guardar el nuevo producto
        this.service.nuevoProducto(result).subscribe(response => {
          // Una vez guardado, actualizamos la lista local de productos
          const newProducto: producto = {
            id: response.id, // El ID devuelto por el backend
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
}
