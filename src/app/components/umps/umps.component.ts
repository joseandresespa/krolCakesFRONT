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

  // array vacio
  umps: unidadmedidapreciosugerido[] = []; 

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: unidadmedidapreciosugerido[] = [];

  constructor(private dialog: MatDialog, private service: CatalogosService) { }

  ngOnInit(): void {
    this.service.unidadesInventario().subscribe((unidadesPS: unidadmedidapreciosugerido[]) => {
      this.umps = unidadesPS;
      this.updatePagination();
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.umps.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.umps.slice(startIndex, endIndex);
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
        // Llamada al servicio para guardar el nuevo producto
        this.service.nuevaUnidadInventario(result).subscribe(response => {
          // Una vez guardado, actualizamos la lista local de productos
          const newUmps: unidadmedidapreciosugerido = {
            id: response.id, // El ID devuelto por el backend
            nombre: response.nombre
          };
          this.umps.push(newUmps);
          this.updatePagination();
        });
      }
    });
  }

  
  // EDITAR
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
        // Crear un objeto con los datos actualizados
        const upmsActualizado = {
          id: umps.id, // Necesitas enviar el ID del producto para identificar cuál actualizar
          nombre: result.nombre
        };
        
        // Llamar al servicio para actualizar el producto en el backend
        this.service.actualizarUnidadInventario(upmsActualizado).subscribe(response => {
          // Actualizar el producto en la lista local si es necesario
          const umpsEditado = this.umps.find(p => p.id === umps.id);
          if (umpsEditado) {
            umpsEditado.nombre = result.nombre;
            this.updatePagination();
          }
        });
      }
    }
  )};
}
