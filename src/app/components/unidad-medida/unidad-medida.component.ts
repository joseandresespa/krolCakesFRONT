import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { unidadmedida } from 'src/app/models/unidadmedida.interface';
import { CatalogosService } from 'src/services/catalogos.service';
import { ModaleditarUnidadComponent } from './modaleditar-unidad/modaleditar-unidad.component';
import { ModalAgregarUnidadComponent } from './modal-agregar-unidad/modal-agregar-unidad.component';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component'; 

@Component({
  selector: 'app-unidad-medida',
  templateUrl: './unidad-medida.component.html',
  styleUrls: ['./unidad-medida.component.css']
})
export class UnidadMedidaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];

  // array vacio
  unidadmedida: unidadmedida[] = [];
  
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: unidadmedida[] = [];

  constructor(public dialog: MatDialog,private service: CatalogosService) { }

  ngOnInit(): void {
    this.service.unidadesCosto().subscribe((datos: unidadmedida[]) => {
      this.unidadmedida = datos;
      this.updatePagination();
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.unidadmedida.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.unidadmedida.slice(startIndex, endIndex);
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

  //Editar medida
  editarUnidadMedida(unidad: unidadmedida): void {
    const dialogRef = this.dialog.open(ModalEditarComponent, {
      width: '400px',
      data: {
        titulo: 'Editar nombre',
        campos: ['nombre'],
        valores: { nombre: unidad.nombre } // Precargar el valor actual del relleno
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const editado = this.unidadmedida.find(r => r.id === unidad.id);
        if (editado) {
          editado.nombre = result.nombre;
          this.updatePagination();
        }
        this.service.actualizarUnidadCosto(editado).subscribe(response => {
          const editado = this.unidadmedida.find(p => p.id === unidad.id);
          if (editado) {
            editado.nombre = result.nombre;
            this.updatePagination();
          }
        });
      }
    });
  }
  

  //Agregar medida
  agregarUnidadMedida(): void {
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '400px',
      data: {
        titulo: 'Agregar Unidad de Medida Costo',
        campos: ['nombre']
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.nuevaUnidadCosto(result).subscribe(response => {
        const nuevo: unidadmedida = {
          id: this.unidadmedida.length + 1,
          nombre: result.nombre
        };
        this.unidadmedida.push(nuevo);
        this.updatePagination();
      }
    )};
  });

  }
  


  

}
