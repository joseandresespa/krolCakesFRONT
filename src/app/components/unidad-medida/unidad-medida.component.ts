import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { unidadmedida } from 'src/app/models/unidadmedida.interface';
import { CatalogosService } from 'src/services/catalogos.service';
import { ModaleditarUnidadComponent } from './modaleditar-unidad/modaleditar-unidad.component';
import { ModalAgregarUnidadComponent } from './modal-agregar-unidad/modal-agregar-unidad.component';

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

  constructor(private dialog: MatDialog, private service: CatalogosService) { }

  

  ngOnInit(): void {
    this.unidadmedida = [];
  this.updatePagination();
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
    const dialogRef = this.dialog.open(ModaleditarUnidadComponent, {
      width: '400px',
      data: unidad 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se ha cerrado');
    });
  }
  

  //Agregar medida
  agregarUnidadMedida(): void {
    const dialogRef = this.dialog.open(ModalAgregarUnidadComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.unidadmedida.push(result); // Agrega la nueva unidad al array
        this.updatePagination(); // Actualiza la tabla y paginación
      }
    });
  }
  


  

}
