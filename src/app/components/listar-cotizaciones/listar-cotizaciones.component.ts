import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { cotizaciononline } from 'src/app/models/cotizaciononline.interface';
import { CatalogosService } from 'src/services/catalogos.service';

@Component({
  selector: 'app-listar-cotizaciones',
  templateUrl: './listar-cotizaciones.component.html',
  styleUrls: ['./listar-cotizaciones.component.css']
})
export class ListarCotizacionesComponent implements OnInit {
  cotizaciones: cotizaciononline[] = []; 


  displayedColumns: string[] = ['id', 'nombre','telefono','descripcion','precio_aproximado','direccion','envio','fecha','hora', 'acciones'];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: cotizaciononline[] = [];

  constructor(public dialog: MatDialog, private service: CatalogosService) { }

  ngOnInit(): void {
    this.service.cotizaciones().subscribe((cotizaciones: cotizaciononline[]) => {
      this.cotizaciones = cotizaciones;
      this.updatePagination();
    });
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

  // abrirModal(): void {
  //   const dialogRef = this.dialog.open(ModalGenericoComponent, {
  //     width: '400px',
  //     data: {
  //       titulo: 'Agregar Cotización',
  //       campos: ['descripcion', 'telefono', 'porciones', 'cant_cupcakes', 'precio_aproximado', 'envio']
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       const newId = this.cotizaciones.length ? Math.max(...this.cotizaciones.map(c => c.id)) + 1 : 1; // Generar nuevo ID
  //       this.cotizaciones.push({ id: newId, ...result });
  //       this.updatePagination();
  //     }
  //   });
  // }

  // // EDITAR
  // editarCotizacion(cotizacion: cotizaciononline): void {
  //   const dialogRef = this.dialog.open(ModalEditarComponent, {
  //     width: '400px',
  //     data: {
  //       titulo: 'Editar Cotización',
  //       campos: ['descripcion', 'telefono', 'porciones', 'cant_cupcakes', 'precio_aproximado', 'envio'],
  //       valores: {
  //         descripcion: cotizacion.descripcion,
  //         telefono: cotizacion.telefono,
  //         porciones: cotizacion.porciones,
  //         cant_cupcakes: cotizacion.cant_cupcakes,
  //         precio_aproximado: cotizacion.precio_aproximado,
  //         envio: cotizacion.envio
  //       }
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       const cotizacionEditada = this.cotizaciones.find(c => c.id === cotizacion.id);
  //       if (cotizacionEditada) {
  //         Object.assign(cotizacionEditada, result);
  //         this.updatePagination();
  //       }
  //     }
  //   });
  // }
}
