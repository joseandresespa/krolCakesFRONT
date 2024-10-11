import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component';
import { cliente } from 'src/app/models/cliente.interface'; 
import { CatalogosService } from 'src/services/catalogos.service';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'telefono','nit', 'acciones'];

  // array para que quede vacío
  clientes: cliente[] = []; 

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: cliente[] = [];

  constructor(public dialog: MatDialog ,private service: CatalogosService) {}

  ngOnInit(): void {
    this.service.clientes().subscribe((cliente: cliente[]) => {
      this.clientes = cliente;
      this.updatePagination();
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.clientes.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.clientes.slice(startIndex, endIndex);
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



  abrirModal(): void {
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '400px',
      data: {
        titulo: 'Agregar Cliente',
        campos: ['nombre', 'telefono']
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientes.push(result);
        this.updatePagination();
      }
    });
  }


  // EDITAR
  editarCliente(cliente: cliente): void {
    const dialogRef = this.dialog.open(ModalEditarComponent, {
      width: '400px',
      data: {
        titulo: 'Editar Cliente',
        campos: ['nombre', 'telefono','nit'],
        valores: {
          nombre: cliente.nombre,
          telefono: cliente.telefono,
          nit: cliente.nit
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const clienteActualizado = this.clientes.find(c => c.id === cliente.id);
        if (clienteActualizado) {
          clienteActualizado.nombre = result.nombre;
          clienteActualizado.telefono = result.telefono;
          clienteActualizado.nit = result.nit;
         
          this.updatePagination();
        }
        this.service.actualizarCliente(clienteActualizado).subscribe(response => {
          // Actualizar el producto en la lista local si es necesario
          const clienteEditado = this.clientes.find(p => p.id === cliente.id);
          if (clienteEditado) {
            clienteEditado.nombre = result.nombre;
            clienteEditado.telefono = result.telefono;
            clienteEditado.nit = result.precio_online;
            this.updatePagination();
          }
        });
      }
    });
  }
}
