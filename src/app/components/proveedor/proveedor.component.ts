import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component';
import { proveedor } from 'src/app/models/proveedor.interface';
import { CatalogosService } from 'src/services/catalogos.service';


@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'telefono', 'descripcion', 'acciones'];

  // Se inicializa el array con un dato de prueba
  proveedores: proveedor[] = []; 

  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: proveedor[] = [];

  constructor(public dialog: MatDialog, private service: CatalogosService) { }

  ngOnInit(): void {
    this.service.proveedores().subscribe((productos: proveedor[]) => {
      this.proveedores = productos;
      this.updatePagination();
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.proveedores.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.proveedores.slice(startIndex, endIndex);
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

  eliminarProveedor(proveedor: proveedor): void {
    console.log('Proveedor eliminado:', proveedor);
    this.proveedores = this.proveedores.filter(p => p.id !== proveedor.id);
    this.updatePagination();
  }

  abrirModalAgregar(): void {
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '400px',
      data: { titulo: 'Agregar Proveedor',
      campos: ['nombre', 'telefono', 'descripcion'] }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Llamada al servicio para guardar el nuevo producto
        this.service.nuevoProveedor(result).subscribe(response => {
          // Una vez guardado, actualizamos la lista local de productos
          const newProveedor: proveedor = {
            id: response.id,
            nombre: response.nombre,
            telefono: response.telefono,
            descripcion: response.descripcion
          };
          this.proveedores.push(newProveedor);
          this.updatePagination();
        });
      }
    });
  }
//EDITAR
editarProveedor(proveedor: proveedor): void {
  const dialogRef = this.dialog.open(ModalEditarComponent, {
    data: {
      titulo: 'Editar Producto',
      campos: ['nombre', 'telefono', 'descripcion'],
      valores: {
        nombre: proveedor.nombre,
        telefono: proveedor.telefono,
        descripcion: proveedor.descripcion
      }
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Crear un objeto con los datos actualizados
      const proveedorActualizado = {
        id: proveedor.id, 
        nombre: result.nombre,
        telefono: result.telefono,
        descripcion: result.descripcion
      };
      
      // Llamar al servicio para actualizar el producto en el backend
      this.service.actualizarProveedores(proveedorActualizado).subscribe(response => {
        // Actualizar el producto en la lista local si es necesario
        const proveedorEditado = this.proveedores.find(p => p.id === proveedor.id);
        if (proveedorEditado) {
          proveedorEditado.nombre = result.nombre;
          proveedorEditado.telefono = result.telefono;
          proveedorEditado.descripcion = result.descripcion;
          this.updatePagination();
        }
      });
    }
  });
}
}
