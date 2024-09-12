import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';

export interface Receta {
  id: number;
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'acciones'];
  
  // Se inicializa con un dato de prueba
  recetas: Receta[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: Receta[] = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.recetas.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.recetas.slice(startIndex, endIndex);
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

  eliminarReceta(receta: Receta): void {
    console.log('Receta eliminada:', receta);
    this.recetas = this.recetas.filter(r => r.id !== receta.id);
    this.updatePagination();
  }


  // EDITAR
  editarReceta(receta: Receta): void {
    const dialogRef = this.dialog.open(ModalEditarComponent, {
      data: {
        titulo: 'Editar Receta',
        campos: ['nombre', 'descripcion'],
        valores: receta
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const recetaEditada = this.recetas.find(r => r.id === receta.id);
        if (recetaEditada) {
          recetaEditada.nombre = result.nombre;
          recetaEditada.descripcion = result.descripcion;
          this.updatePagination();
        }
      }
    });
  }

  openModal(): void {
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      data: {
        titulo: 'Agregar Receta',
        campos: ['nombre', 'descripcion']
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newReceta: Receta = {
          id: this.recetas.length + 1,
          nombre: result.nombre,
          descripcion: result.descripcion
        };
        this.recetas.push(newReceta);
        this.updatePagination();
      }
    });
  }
}
