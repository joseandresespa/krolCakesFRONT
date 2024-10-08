import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component'; // importar el componente de edición
import { MotivoSalida } from 'src/app/models/motivosalida.interface';
import { CatalogosService } from 'src/services/catalogos.service';

@Component({
  selector: 'app-motivo-salida',
  templateUrl: './motivo-salida.component.html',
  styleUrls: ['./motivo-salida.component.css']
})
export class MotivoSalidaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];

  // array vacio
  motivosSalida: MotivoSalida[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 1;
  pages: number[] = [];
  dataSource: MotivoSalida[] = [];

  constructor(public dialog: MatDialog,private service: CatalogosService) { }

  ngOnInit(): void {
    this.service.tipoSalida().subscribe((datos: MotivoSalida[]) => {
      this.motivosSalida = datos;
      this.updatePagination();
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.motivosSalida.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.motivosSalida.slice(startIndex, endIndex);
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

  eliminarMotivoSalida(motivoSalida: MotivoSalida): void {
    console.log('Motivo de salida eliminado:', motivoSalida);
    this.motivosSalida = this.motivosSalida.filter(m => m.id !== motivoSalida.id);
    this.updatePagination();
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(ModalGenericoComponent, {
      width: '400px',
      data: {
        titulo: 'Agregar Motivo de Salida',
        campos: ['nombre']
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.nuevoTipoSalida(result).subscribe(response => {
        const nuevo: MotivoSalida = {
          id: this.motivosSalida.length + 1,
          nombre: result.nombre
        };
        this.motivosSalida.push(nuevo);
        this.updatePagination();
      }
    )};
  });
  }

  // EDITAR
  editarMotivo(motivoSalida: MotivoSalida): void {
    const dialogRef = this.dialog.open(ModalEditarComponent, {
      width: '400px',
      data: {
        titulo: 'Editar Motivo de Salida',
        campos: ['nombre'],
        valores: { nombre: motivoSalida.nombre } // Precargar el valor actual del motivo de salida
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const editado = this.motivosSalida.find(r => r.id === motivoSalida.id);
        if (editado) {
          editado.nombre = result.nombre;
          this.updatePagination();
        }
        this.service.ActualizarTipoSalida(editado).subscribe(response => {
          const editado = this.motivosSalida.find(p => p.id === motivoSalida.id);
          if (editado) {
            editado.nombre = result.nombre;
            this.updatePagination();
          }
        });
      }
    });
  }
}
