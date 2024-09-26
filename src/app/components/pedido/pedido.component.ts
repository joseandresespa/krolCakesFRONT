
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { pedido } from 'src/app/models/pedido.interface';
import { ModalAgregarPedidoComponent } from './modal-agregar-pedido/modal-agregar-pedido.component';
import { ModalEditarPedidoComponent } from './modal-editar-pedido/modal-editar-pedido.component';
import { ModalPedidoDesgloseComponent } from './modal-pedido-desglose/modal-pedido-desglose.component';
import { ModalEstadoPedidoComponent } from './modal-estado-pedido/modal-estado-pedido.component';
import { CotizacionPedidosService } from 'src/services/cotizacion-pedidos.service';



@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  pedidos: pedido[] = []; 


  displayedColumns: string[] = ['id', 'descripcion', 'cliente','estado', 'manobra','insumos','total_presupuesto',
   'fecha','hora', 'observaciones','telefono','direccion','envio','acciones'];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: pedido[] = [];

  constructor(public dialog: MatDialog, private service: CotizacionPedidosService) { }

  ngOnInit(): void {
    this.service.pedidos().subscribe((pedido: pedido[]) => {
      this.pedidos = pedido;
      this.updatePagination();
    });
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

  abrirModalAgregarPedido(pedidos:pedido): void {
    const dialogRef = this.dialog.open(ModalAgregarPedidoComponent, {
      width: '600px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pedidos.push(result); // Agregar el nuevo pedido a la lista
        this.updatePagination();   // Actualizar la tabla
      }
    });
  }

  abrirModalEditarPedido(pedido: pedido): void {
    const dialogRef = this.dialog.open(ModalEditarPedidoComponent, {
      width: '600px',
      data: pedido
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.pedidos.findIndex(p => p.id === pedido.id);
        if (index !== -1) {
          this.pedidos[index] = result; // Actualizar el pedido en la lista
          this.updatePagination();      // Actualizar la tabla
        }
      }
    });
  }
  

  abrirModalPedidoDesglose(pedido: pedido): void {
    const dialogRef = this.dialog.open(ModalPedidoDesgloseComponent, {
      width: '600px',
      data: pedido
    });
    console.log(pedido);


}

abrirModalEstadoPedido(pedido: pedido): void {
  const dialogRef = this.dialog.open(ModalEstadoPedidoComponent, {
    width: '400px',
    data: { estado: pedido.id_estado, id_pedido: pedido.id }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result !== undefined) {
      const index = this.pedidos.findIndex(p => p.id === pedido.id);
      if (index !== -1) {
        this.pedidos[index].id_estado = result; // Actualizar el estado
        this.updatePagination(); // Actualizar la tabla
      }
      
    }
  });
}

}
