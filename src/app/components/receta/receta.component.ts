import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';
import { CatalogosService } from 'src/services/catalogos.service';
import { receta } from 'src/app/models/receta.interface';


@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'acciones'];
  
  // Se inicializa con un dato de prueba
  recetas: receta[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: receta[] = [];

  constructor(private dialog: MatDialog,private service: CatalogosService) { }

  ngOnInit(): void {
    this.service.recetas().subscribe((receta: receta[]) => {
      this.recetas = receta;
      this.updatePagination();
    });
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


  // EDITAR
  editarReceta(receta: receta): void {
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
        this.service.actualizarReceta(recetaEditada).subscribe(response => {
          const editado = this.recetas.find(p => p.id === receta.id);
          if (editado) {
            editado.nombre = result.nombre;
            editado.descripcion = result.descripcion;
            this.updatePagination();
          }
        });
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
        this.service.nuevaReceta(result).subscribe(response => {
        const newReceta: receta = {
          id: this.recetas.length + 1,
          nombre: result.nombre,
          descripcion: result.descripcion
        };
        this.recetas.push(newReceta);
        this.updatePagination();
      } 
    )};
    });
  }
}
