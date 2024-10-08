import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component';
import { tipoevento } from 'src/app/models/tipoevento.interface';
import { CatalogosService } from 'src/services/catalogos.service';


@Component({
  selector: 'app-tipo-evento',
  templateUrl: './tipo-evento.component.html',
  styleUrls: ['./tipo-evento.component.css']
})
export class TipoEventoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];

  // array vacio
  tiposEvento: tipoevento[] = []; 

  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: tipoevento[] = [];

  constructor(public dialog: MatDialog,private service: CatalogosService) { }

  ngOnInit(): void {
    this.service.tipoEvento().subscribe((cliente: tipoevento[]) => {
      this.tiposEvento = cliente;
      this.updatePagination();
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.tiposEvento.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.tiposEvento.slice(startIndex, endIndex);
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

  eliminarTipoEvento(tipoEvento: tipoevento): void {
    console.log('Tipo de evento eliminado:', tipoEvento);
    this.tiposEvento = this.tiposEvento.filter(t => t.id !== tipoEvento.id);
    this.updatePagination();
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '400px',
      data: {
        titulo: 'Agregar Tipo de Evento',
        campos: ['nombre']
      }
      
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.service.nuevoTipoEvento(result).subscribe(response => {
          const nuevo: tipoevento = {
            id: this.tiposEvento.length + 1,
            nombre: result.nombre
          };
          this.tiposEvento.push(nuevo);
          this.updatePagination();
        }
      )};
    });
  }

  // EDITAR
  editarTipoEvento(tipoEvento: tipoevento): void {
    const dialogRef = this.dialog.open(ModalEditarComponent, {
      width: '400px',
      data: {
        titulo: 'Editar Tipo de Evento',
        campos: ['nombre'],
        valores: {
          nombre: tipoEvento.nombre
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const editado = this.tiposEvento.find(r => r.id === tipoEvento.id);
        if (editado) {
          editado.nombre = result.nombre;
          this.updatePagination();
        }
        this.service.ActualizarTipoEvento(editado).subscribe(response => {
          const editado = this.tiposEvento.find(p => p.id === tipoEvento.id);
          if (editado) {
            editado.nombre = result.nombre;
            this.updatePagination();
          }
        });
      }
    });

  }



}
