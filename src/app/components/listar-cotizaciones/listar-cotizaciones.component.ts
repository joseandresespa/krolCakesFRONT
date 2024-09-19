
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { cotizaciononline } from 'src/app/models/cotizaciononline.interface';
import { CatalogosService } from 'src/services/catalogos.service';
import { ModalCotizacionComponent } from './modal-cotizacion/modal-cotizacion.component';
import { ModalConfirmarComponent } from './modal-confirmar/modal-confirmar.component';
import { ModalObservacionComponent } from './modal-observacion/modal-observacion.component';

@Component({
  selector: 'app-listar-cotizaciones',
  templateUrl: './listar-cotizaciones.component.html',
  styleUrls: ['./listar-cotizaciones.component.css']
})
export class ListarCotizacionesComponent implements OnInit {
  cotizaciones: cotizaciononline[] = []; 


  displayedColumns: string[] = ['id', 'nombre','telefono','descripcion','precio_aproximado','direccion','envio','fecha','hora','estado','mano_obra','presupuesto_insumos', 'total_presupuesto', 'acciones'];
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

  abrirModalDetalle(cotizacion: cotizaciononline): void {
    this.dialog.open(ModalCotizacionComponent, {
      width: '600px',
      data: cotizacion
    });
  }

  abrirModalConfirmar(cotizacion: cotizaciononline): void {
    this.dialog.open(ModalConfirmarComponent, {
      width: '600px',
      data: cotizacion
    });
  }

  abrirModalObservacion(cotizacion: cotizaciononline): void {
    this.dialog.open(ModalObservacionComponent, {
      width: '600px',
      data: cotizacion
    });
  }

}
