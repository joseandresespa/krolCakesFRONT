import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';

export interface Cotizacion {
  id: number;
  descripcion: string;
  telefono: string;
  porciones: number;
  cant_cupcakes: number;
  precio_aproximado: number;
  envio: string;
}

@Component({
  selector: 'app-listar-cotizaciones',
  templateUrl: './listar-cotizaciones.component.html',
  styleUrls: ['./listar-cotizaciones.component.css']
})
export class ListarCotizacionesComponent implements OnInit {
 // Se inicializa el array para que quede vacio
 cotizaciones: Cotizacion[] = []; 

  displayedColumns: string[] = ['id', 'descripcion', 'telefono', 'porciones', 'cant_cupcakes', 'precio_aproximado', 'envio', 'acciones'];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: Cotizacion[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.cotizaciones.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.cotizaciones.slice(startIndex, endIndex);
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

  eliminarCotizacion(cotizacion: Cotizacion): void {
    console.log('Cotización eliminada:', cotizacion);
    this.cotizaciones = this.cotizaciones.filter(c => c.id !== cotizacion.id);
    this.updatePagination();
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '400px',
      data: {
        titulo: 'Agregar Cotización',
        campos: ['descripcion', 'telefono', 'porciones', 'cant_cupcakes', 'precio_aproximado', 'envio']
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newId = this.cotizaciones.length ? Math.max(...this.cotizaciones.map(c => c.id)) + 1 : 1; // Generar nuevo ID
        this.cotizaciones.push({ id: newId, ...result });
        this.updatePagination();
      }
    });
  }
}

