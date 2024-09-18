
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { pedido } from 'src/app/models/pedido.interface';
import { ModalAgregarComponent } from './modal-agregar/modal-agregar.component';
import { ModalEditarComponent } from './modal-editar/modal-editar.component';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  pedidos: pedido[] = [
   
  ]; 


  displayedColumns: string[] = ['id', 'fecha','hora','id_estado','id_cliente','observaciones','direccion','id_tipo_entrega','precio_total','acciones'];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: pedido[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.pedidos.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.pedidos.slice(startIndex, endIndex);
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

  abrirModalAgregar(pedidos: pedido): void {
    this.dialog.open(ModalAgregarComponent, {
      width: '600px',
      data: pedidos
    });
  }

  abrirModalEditar(pedidos: pedido): void {
    this.dialog.open(ModalEditarComponent, {
      width: '600px',
      data: pedidos
    });
  }
  

}
